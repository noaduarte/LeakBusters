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
  YearlyConsumption,
} from '@/lib/types';
import { ConsumptionDatePicker } from './consumption-date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

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
  yearlyData: YearlyConsumption[];
  onDateChange: (date: Date | undefined) => void;
  onMonthChange: (month: string) => void;
  onYearChangeForDaily: (year: string) => void;
  onYearChangeForMonthly: (year: string) => void;
  selectedDate: Date;
  selectedMonth: number;
  selectedYearForDaily: number;
  selectedYearForMonthly: number;
};

export function ConsumptionView({
  hourlyData,
  dailyData,
  monthlyData,
  yearlyData,
  onDateChange,
  onMonthChange,
  onYearChangeForDaily,
  onYearChangeForMonthly,
  selectedDate,
  selectedMonth,
  selectedYearForDaily,
  selectedYearForMonthly,
}: ConsumptionViewProps) {
  const [activeTab, setActiveTab] = useState('horari');
  const currentYear = 2024;
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  const months = [
    { value: '0', label: 'Gener' },
    { value: '1', label: 'Febrer' },
    { value: '2', label: 'Març' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Maig' },
    { value: '5', label: 'Juny' },
    { value: '6', label: 'Juliol' },
    { value: '7', label: 'Agost' },
    { value: '8', label: 'Setembre' },
    { value: '9', label: 'Octubre' },
    { value: '10', label: 'Novembre' },
    { value: '11', label: 'Desembre' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gràfics de Consum</CardTitle>
        <CardDescription>
          Fes clic a les pestanyes per veure les teves dades de consum.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="horari" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <TabsList className="grid grid-cols-4 w-auto">
              <TabsTrigger value="horari">Horari</TabsTrigger>
              <TabsTrigger value="daily">Diari</TabsTrigger>
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              {activeTab === 'horari' && (
                <ConsumptionDatePicker
                  date={selectedDate}
                  onDateChange={onDateChange}
                />
              )}
              {activeTab === 'daily' && (
                <>
                  <Select value={selectedMonth.toString()} onValueChange={onMonthChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   <Select value={selectedYearForDaily.toString()} onValueChange={onYearChangeForDaily}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              {activeTab === 'monthly' && (
                 <Select value={selectedYearForMonthly.toString()} onValueChange={onYearChangeForMonthly}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un any" />
                    </SelectTrigger>
                    <SelectContent>
                       {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              )}
            </div>
          </div>
          <TabsContent value="horari" className="mt-6">
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
          <TabsContent value="daily" className="mt-6">
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
          <TabsContent value="monthly" className="mt-6">
             <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={monthlyData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k L`} />
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
           <TabsContent value="yearly" className="mt-6">
             <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={yearlyData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k L`} />
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
            <p className="text-center text-sm text-muted-foreground mt-4">Comparació del consum total entre anys.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
