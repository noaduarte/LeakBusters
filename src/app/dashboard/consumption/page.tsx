'use client';
import { ConsumptionView } from '@/components/consumption/consumption-view';
import { PageHeader } from '@/components/page-header';
import { 
  getHourlyConsumptionForDay, 
  getDailyConsumptionForMonth, 
  getMonthlyConsumptionForYear,
  getYearlyConsumption
} from '@/lib/data';
import { LineChart } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function ConsumptionPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-04-15'));
  const [selectedMonthForDaily, setSelectedMonthForDaily] = useState<number>(new Date().getMonth());
  const [selectedYearForDaily, setSelectedYearForDaily] = useState<number>(new Date().getFullYear());
  const [selectedYearForMonthly, setSelectedYearForMonthly] = useState<number>(new Date().getFullYear());

  const hourlyData = useMemo(() => getHourlyConsumptionForDay(selectedDate), [selectedDate]);
  const dailyData = useMemo(() => getDailyConsumptionForMonth(selectedYearForDaily, selectedMonthForDaily), [selectedYearForDaily, selectedMonthForDaily]);
  const monthlyData = useMemo(() => getMonthlyConsumptionForYear(selectedYearForMonthly), [selectedYearForMonthly]);
  const yearlyData = useMemo(() => getYearlyConsumption(), []);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const handleMonthChangeForDaily = (month: string) => {
    setSelectedMonthForDaily(parseInt(month, 10));
  };

  const handleYearChangeForDaily = (year: string) => {
    setSelectedYearForDaily(parseInt(year, 10));
  };
  
  const handleYearChangeForMonthly = (year: string) => {
    setSelectedYearForMonthly(parseInt(year, 10));
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Anàlisi de Consum"
        description="Analitza els teus patrons de consum d'aigua en diferents períodes de temps."
        icon={<LineChart />}
      />
      <ConsumptionView
        hourlyData={hourlyData}
        dailyData={dailyData}
        monthlyData={monthlyData}
        yearlyData={yearlyData}
        onDateChange={handleDateChange}
        onMonthChangeForDaily={handleMonthChangeForDaily}
        onYearChangeForDaily={handleYearChangeForDaily}
        onYearChangeForMonthly={handleYearChangeForMonthly}
        selectedDate={selectedDate}
        selectedMonthForDaily={selectedMonthForDaily}
        selectedYearForDaily={selectedYearForDaily}
        selectedYearForMonthly={selectedYearForMonthly}
      />
    </div>
  );
}
