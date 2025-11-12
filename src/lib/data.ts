import type {
  Bill,
  ConsumptionRecord,
} from './types';
import consumptionData from '@/lib/data/dataset_cliente.json' with { type: 'json' };

// Type assertion for the imported JSON data
const typedConsumptionData: ConsumptionRecord[] = consumptionData as ConsumptionRecord[];


const getMonthlyConsumption = (data: ConsumptionRecord[]) => {
  const monthlyTotals: { [key: string]: number } = {};
  const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];

  data.forEach(record => {
    const date = new Date(record.lectura_fecha);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${monthNames[month]}`;
    if (!monthlyTotals[key]) {
      monthlyTotals[key] = 0;
    }
    monthlyTotals[key] += record.consum_registrat_m3;
  });

  return Object.entries(monthlyTotals).map(([month, consumption]) => ({
    month: month.split('-')[1],
    consumption: Math.round(consumption * 264.172), // m3 to gallons
  })).slice(-12); // Get last 12 months
};

export const getDailyConsumptionForUser = (polizaSubm: string) => {
  const userData = typedConsumptionData.filter(d => d.poliza_subm === polizaSubm);
  return userData.map(record => ({
    date: new Date(record.lectura_fecha).toLocaleDateString('ca-ES', { month: 'short', day: 'numeric' }),
    consumption: Math.round(record.consum_registrat_m3 * 264.172), // m3 to gallons
  })).slice(-30); // Last 30 days
};


export const getMonthlyConsumptionForUser = (polizaSubm: string) => {
    const userData = typedConsumptionData.filter(d => d.poliza_subm === polizaSubm);
    return getMonthlyConsumption(userData);
};

export const getYearlyConsumptionForUser = (polizaSubm: string) => {
    const userData = typedConsumptionData.filter(d => d.poliza_subm === polizaSubm);
    const yearlyTotals: { [key: number]: number } = {};

    userData.forEach(record => {
        const year = new Date(record.lectura_fecha).getFullYear();
        if (!yearlyTotals[year]) {
            yearlyTotals[year] = 0;
        }
        yearlyTotals[year] += record.consum_registrat_m3;
    });

    return Object.entries(yearlyTotals).map(([year, consumption]) => ({
        year: parseInt(year, 10),
        consumption: Math.round(consumption * 264.172), // m3 to gallons
    }));
};

export const getAverageMonthlyConsumption = () => {
    return getMonthlyConsumption(typedConsumptionData);
}

export const dailyConsumption = getDailyConsumptionForUser('999000011116');
export const monthlyConsumption = getMonthlyConsumptionForUser('999000011116');
export const yearlyConsumption = getYearlyConsumptionForUser('999000011116');


export const bills: Bill[] = [
  {
    id: 'BILL-001',
    month: 'July 2024',
    amount: 125.5,
    status: 'Due',
    dueDate: '2024-08-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-002',
    month: 'June 2024',
    amount: 120.75,
    status: 'Paid',
    dueDate: '2024-07-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-003',
    month: 'May 2024',
    amount: 115.2,
    status: 'Paid',
    dueDate: '2024-06-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-004',
    month: 'April 2024',
    amount: 110.0,
    status: 'Paid',
    dueDate: '2024-05-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-005',
    month: 'March 2024',
    amount: 130.4,
    status: 'Paid',
    dueDate: '2024-04-15',
    statementUrl: '#',
  },
  {
    id: 'BILL-006',
    month: 'February 2024',
    amount: 105.9,
    status: 'Paid',
    dueDate: '2024-03-15',
    statementUrl: '#',
  },
];
