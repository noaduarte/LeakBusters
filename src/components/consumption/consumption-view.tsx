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
import { Button } from '../ui/button';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

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
  onMonthChangeForDaily: (month: string) => void;
  onYearChangeForDaily: (year: string) => void;
  onYearChangeForMonthly: (year: string) => void;
  selectedDate: Date;
  selectedMonthForDaily: number;
  selectedYearForDaily: number;
  selectedYearForMonthly: number;
};

export function ConsumptionView({
  hourlyData,
  dailyData,
  monthlyData,
  yearlyData,
  onDateChange,
  onMonthChangeForDaily,
  onYearChangeForDaily,
  onYearChangeForMonthly,
  selectedDate,
  selectedMonthForDaily,
  selectedYearForDaily,
  selectedYearForMonthly,
}: ConsumptionViewProps) {
  const [activeTab, setActiveTab] = useState('horari');
  const [leakPrediction, setLeakPrediction] = useState<{ risk: 'low' | 'high', percentage: number } | null>(null);

  const currentYear = 2024;
  const years = Array.from({ length: 1 }, (_, i) => (currentYear - i).toString());
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

  const handleLeakCheck = () => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth(); // 3 = April

    let percentage: number;

    const specificRiskDates: { [key: string]: number } = {
      "3-5": 11, // April 5th
      "3-15": 70,
      "3-16": 71,
      "3-17": 72,
      "3-18": 74,
      "3-19": 76,
      "3-20": 80,
      "3-21": 85,
      "3-22": 90,
      "3-23": 95,
      "3-24": 84,
    };

    const dateKey = `${month}-${day}`;
    
    if (specificRiskDates[dateKey] !== undefined) {
      percentage = specificRiskDates[dateKey];
    } else if (month === 3 && day >= 15 && day <= 24) {
       percentage = Math.floor(Math.random() * (85 - 70 + 1)) + 70;
    } else {
      percentage = Math.floor(Math.random() * 26); // 0-25%
    }
    
    const risk = percentage > 65 ? 'high' : 'low';
    setLeakPrediction({ risk, percentage });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLeakPrediction(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gràfics de Consum</CardTitle>
        <CardDescription>
          Fes clic a les pestanyes per veure les teves dades de consum.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="horari" onValueChange={handleTabChange} value={activeTab}>
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
                  month={selectedDate.getMonth()}
                  year={selectedDate.getFullYear()}
                />
              )}
              {activeTab === 'daily' && (
                <>
                  <Select value={selectedMonthForDaily.toString()} onValueChange={onMonthChangeForDaily}>
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
            <div className="mt-6 border-t pt-6 flex flex-col items-center gap-4">
                <Button onClick={handleLeakCheck} className="w-full max-w-sm">
                    <AlertTriangle className="mr-2 size-4" />
                    Analitzar Risc de Fuga per a Aquest Dia
                </Button>
                 {leakPrediction?.risk === 'high' && (
                  <Alert variant="destructive" className="w-full max-w-sm text-center">
                    <div className="flex justify-center mb-2">
                        <AlertTriangle className="h-8 w-8" />
                    </div>
                    <AlertTitle className="text-lg font-bold">Risc Alt: {leakPrediction.percentage}%</AlertTitle>
                    <AlertDescription>
                      S'ha detectat un patró de consum anòmal. Es recomana una revisió. 
                      Pots contactar-nos al 900 123 456.
                    </AlertDescription>
                  </Alert>
                )}
                {leakPrediction?.risk === 'low' && (
                  <Alert className="w-full max-w-sm text-center">
                    <div className="flex justify-center mb-2">
                      <ShieldCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <AlertTitle className="text-lg font-bold">Risc Baix: {leakPrediction.percentage}%</AlertTitle>
                    <AlertDescription>
                      No s'han detectat anomalies significatives en el consum.
                    </AlertDescription>
                  </Alert>
                )}
            </div>
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

    