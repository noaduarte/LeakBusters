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
  const [selectedMonth, setSelectedMonth] = useState<number>(selectedDate.getMonth());
  const [selectedYearForDaily, setSelectedYearForDaily] = useState<number>(selectedDate.getFullYear());
  const [selectedYearForMonthly, setSelectedYearForMonthly] = useState<number>(new Date().getFullYear());

  const hourlyData = useMemo(() => getHourlyConsumptionForDay(selectedDate), [selectedDate]);
  const dailyData = useMemo(() => getDailyConsumptionForMonth(selectedYearForDaily, selectedMonth), [selectedYearForDaily, selectedMonth]);
  const monthlyData = useMemo(() => getMonthlyConsumptionForYear(selectedYearForMonthly), [selectedYearForMonthly]);
  const yearlyData = useMemo(() => getYearlyConsumption(), []);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedMonth(date.getMonth());
      setSelectedYearForDaily(date.getFullYear());
    }
  };

  const handleMonthChange = (month: string) => {
    const newMonth = parseInt(month, 10);
    setSelectedMonth(newMonth);
    const newDate = new Date(selectedYearForDaily, newMonth, 1);
    setSelectedDate(newDate);
  };

  const handleYearChangeForDaily = (year: string) => {
    const newYear = parseInt(year, 10);
    setSelectedYearForDaily(newYear);
    const newDate = new Date(newYear, selectedMonth, 1);
    setSelectedDate(newDate);
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
        onMonthChange={handleMonthChange}
        onYearChangeForDaily={handleYearChangeForDaily}
        onYearChangeForMonthly={handleYearChangeForMonthly}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedYearForDaily={selectedYearForDaily}
        selectedYearForMonthly={selectedYearForMonthly}
      />
    </div>
  );
}
