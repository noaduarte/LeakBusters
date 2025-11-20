import type {
  Bill,
  ConsumptionRecord,
  DailyConsumption,
  HourlyConsumption,
  MonthlyConsumption,
  YearlyConsumption,
} from './types';
import consumptionData from '../../data/dades_user1.json';
import dailyAvgData from '../../data/daily_avg.json';
import monthlyAvgData from '../../data/monthly_avg.json';

const typedConsumptionData: ConsumptionRecord[] = consumptionData as ConsumptionRecord[];
const typedDailyAvgData: { FECHA: string; CONSUMO_REAL: number }[] = dailyAvgData;
const typedMonthlyAvgData: { MES: string; CONSUMO_REAL: number }[] = monthlyAvgData;


const getHourlyData = (day: Date): HourlyConsumption[] => {
  const hourlyConsumption: { [key: number]: number } = {};
  const hourCounts: { [key: number]: number } = {};

  typedConsumptionData.forEach(record => {
    if (record.CONSUMO_REAL === null) return;

    const recordDate = new Date(record.FECHA_HORA);
    if (
      recordDate.getFullYear() === day.getFullYear() &&
      recordDate.getMonth() === day.getMonth() &&
      recordDate.getDate() === day.getDate()
    ) {
      const hour = recordDate.getHours();
      if (!hourlyConsumption[hour]) {
        hourlyConsumption[hour] = 0;
        hourCounts[hour] = 0;
      }
      hourlyConsumption[hour] += record.CONSUMO_REAL;
      hourCounts[hour] += 1;
    }
  });

  const result: HourlyConsumption[] = [];
  for (let i = 0; i < 24; i++) {
    result.push({
      hour: `${i.toString().padStart(2, '0')}:00`,
      consumption: hourlyConsumption[i] ? Math.round(hourlyConsumption[i]) : 0,
    });
  }
  return result;
};


export const getHourlyConsumptionForDay = (day: Date): HourlyConsumption[] => {
  return getHourlyData(day);
};

export const getDailyConsumptionForMonth = (year: number, month: number): DailyConsumption[] => {
  const dailyTotals: { [key: number]: number } = {};
  
  typedConsumptionData.forEach(record => {
    if (record.CONSUMO_REAL === null) return;
    const recordDate = new Date(record.FECHA_HORA);
    if (
      recordDate.getFullYear() === year &&
      recordDate.getMonth() === month
    ) {
      const day = recordDate.getDate();
      if (!dailyTotals[day]) {
        dailyTotals[day] = 0;
      }
      dailyTotals[day] += record.CONSUMO_REAL;
    }
  });

  const result: DailyConsumption[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    result.push({
      date: i.toString(),
      consumption: dailyTotals[i] ? Math.round(dailyTotals[i]) : 0,
    });
  }
  return result;
};

export const getMonthlyConsumptionForYear = (year: number): MonthlyConsumption[] => {
    const monthlyTotals: { [key: number]: number } = {};
    const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];

    typedConsumptionData.forEach(record => {
        if (record.CONSUMO_REAL === null) return;
        const recordDate = new Date(record.FECHA_HORA);
        if (recordDate.getFullYear() === year) {
            const month = recordDate.getMonth();
            if (!monthlyTotals[month]) {
                monthlyTotals[month] = 0;
            }
            monthlyTotals[month] += record.CONSUMO_REAL;
        }
    });

    const result: MonthlyConsumption[] = [];
    for (let i = 0; i < 12; i++) {
        result.push({
            month: monthNames[i],
            consumption: monthlyTotals[i] ? Math.round(monthlyTotals[i]) : 0,
        });
    }
    return result;
};


export const getMonthlyConsumptionForUser = () => {
    const monthlyTotals: { [key: string]: number } = {};
    const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];

    typedConsumptionData.forEach(record => {
        if (record.CONSUMO_REAL === null) return;
        const date = new Date(record.FECHA_HORA);
        const month = date.getMonth();
        const year = date.getFullYear();
        // We only care about 2024 for this chart
        if (year !== 2024) return;
        const key = `${year}-${month.toString().padStart(2, '0')}`;
        if (!monthlyTotals[key]) {
            monthlyTotals[key] = 0;
        }
        monthlyTotals[key] += record.CONSUMO_REAL;
    });

    const sortedMonths = Object.keys(monthlyTotals).sort();

    return sortedMonths.map(key => {
        const [year, monthIndex] = key.split('-');
        return {
            month: monthNames[parseInt(monthIndex, 10)],
            consumption: Math.round(monthlyTotals[key]),
        };
    });
};

export const getYearlyConsumption = (): YearlyConsumption[] => {
  const yearlyTotals: { [key: number]: number } = {};

  typedConsumptionData.forEach(record => {
    if (record.CONSUMO_REAL === null) return;
    const recordDate = new Date(record.FECHA_HORA);
    const year = recordDate.getFullYear();
    if (!yearlyTotals[year]) {
      yearlyTotals[year] = 0;
    }
    yearlyTotals[year] += record.CONSUMO_REAL;
  });

  return Object.keys(yearlyTotals).map(year => ({
    year: year.toString(),
    consumption: Math.round(yearlyTotals[parseInt(year, 10)]),
  }));
};


export const getAverageMonthlyConsumption = () => {
    const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];
    return typedMonthlyAvgData.filter(d => d.MES.startsWith('2024')).map(d => ({
        month: monthNames[new Date(d.MES).getMonth()],
        consumption: Math.round(d.CONSUMO_REAL),
    }));
}

export const getAverageDailyConsumption = () => {
    return typedDailyAvgData.map(d => ({
        date: d.FECHA,
        consumption: d.CONSUMO_REAL,
    }));
}


export const bills: Bill[] = [
  {
    id: 'BILL-001',
    month: 'Juliol 2024',
    amount: 125.5,
    status: 'Due',
    dueDate: '2024-08-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-002',
    month: 'Juny 2024',
    amount: 120.75,
    status: 'Paid',
    dueDate: '2024-07-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-003',
    month: 'Maig 2024',
    amount: 115.2,
    status: 'Paid',
    dueDate: '2024-06-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-004',
    month: 'Abril 2024',
    amount: 110.0,
    status: 'Paid',
    dueDate: '2024-05-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-005',
    month: 'Març 2024',
    amount: 130.4,
    status: 'Paid',
    dueDate: '2024-04-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-006',
    month: 'Febrer 2024',
    amount: 105.9,
    status: 'Paid',
    dueDate: '2024-03-15',
    statementUrl: '#',
  },
];
