'use client';
import { useState, useMemo } from 'react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import {
  getMonthlyConsumptionForUser,
  getAverageMonthlyConsumption,
  getDailyConsumptionForMonth,
  getAverageDailyConsumption,
} from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const monthlyChartConfig = {
  userConsumption: {
    label: 'El Teu Consum',
    color: 'hsl(var(--chart-1))',
  },
  averageConsumption: {
    label: 'Consum Mitjà',
    color: 'hsl(var(--chart-2))',
  },
};

const dailyChartConfig = {
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
  const [activeTab, setActiveTab] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const userMonthlyConsumption = useMemo(() => getMonthlyConsumptionForUser(), []);
  const averageMonthlyConsumption = useMemo(() => getAverageMonthlyConsumption(), []);

  const monthlyCombinedData = useMemo(() => {
    return averageMonthlyConsumption.map((avg) => {
      const userMonth = userMonthlyConsumption.find((uc) => uc.month === avg.month);
      return {
        month: avg.month,
        userConsumption: userMonth ? userMonth.consumption : 0,
        averageConsumption: avg.consumption,
      };
    });
  }, [userMonthlyConsumption, averageMonthlyConsumption]);

  const userDailyConsumption = useMemo(() => getDailyConsumptionForMonth(selectedYear, selectedMonth), [selectedYear, selectedMonth]);
  const averageDailyConsumption = useMemo(() => {
    const allAverages = getAverageDailyConsumption();
    return allAverages.filter(d => {
      const date = new Date(d.date);
      return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
    }).map(d => ({
      date: new Date(d.date).getDate().toString(),
      consumption: d.consumption
    }));
  }, [selectedYear, selectedMonth]);

  const dailyCombinedData = useMemo(() => {
    return userDailyConsumption.map(userDay => {
      const avgDay = averageDailyConsumption.find(avg => avg.date === userDay.date);
      return {
        date: userDay.date,
        userConsumption: userDay.consumption,
        averageConsumption: avgDay ? avgDay.consumption : 0,
      }
    });
  }, [userDailyConsumption, averageDailyConsumption]);

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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Conscienciació sobre el Consum"
        description="Compara el teu consum d'aigua amb la mitjana de tots els usuaris."
        icon={<Users />}
      />
      <Card>
        <CardHeader>
          <CardTitle>Comparativa de Consum</CardTitle>
          <CardDescription>
            Fes clic a les pestanyes per veure la comparativa de consum mensual o diària.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <TabsList className="grid grid-cols-2 w-auto">
                <TabsTrigger value="monthly">Mensual</TabsTrigger>
                <TabsTrigger value="daily">Diari</TabsTrigger>
              </TabsList>
              {activeTab === 'daily' && (
                <div className="flex items-center gap-2">
                  <Select value={selectedMonth.toString()} onValueChange={(val) => setSelectedMonth(parseInt(val))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(parseInt(val))}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <TabsContent value="monthly" className="mt-6">
              <ChartContainer config={monthlyChartConfig} className="h-[400px] w-full">
                <BarChart data={monthlyCombinedData} accessibilityLayer>
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
                    name={monthlyChartConfig.userConsumption.label}
                    fill="var(--color-userConsumption)"
                    radius={4}
                  />
                  <Bar
                    dataKey="averageConsumption"
                    name={monthlyChartConfig.averageConsumption.label}
                    fill="var(--color-averageConsumption)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
              <p className="text-center text-sm text-muted-foreground mt-4">El teu consum (blau) enfront de la mitjana de la comunitat (verd).</p>
            </TabsContent>
            <TabsContent value="daily" className="mt-6">
              <ChartContainer config={dailyChartConfig} className="h-[400px] w-full">
                <BarChart data={dailyCombinedData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
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
                    name={dailyChartConfig.userConsumption.label}
                    fill="var(--color-userConsumption)"
                    radius={4}
                  />
                  <Bar
                    dataKey="averageConsumption"
                    name={dailyChartConfig.averageConsumption.label}
                    fill="var(--color-averageConsumption)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
               <p className="text-center text-sm text-muted-foreground mt-4">El teu consum (blau) enfront de la mitjana de la comunitat (verd) per al mes seleccionat.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
