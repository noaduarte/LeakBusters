import type {
  Bill,
  ConsumptionRecord,
  DailyConsumption,
  HourlyConsumption,
  MonthlyConsumption,
} from './types';
import consumptionData from './data/dades_sensefuites_ambconsums.json' with { type: 'json' };

const typedConsumptionData: ConsumptionRecord[] = consumptionData as ConsumptionRecord[];


// --- DATA GENERATION HELPERS (MOCKING FOR GRANULARITY) ---

// Helper to generate random hourly data for a specific day
const generateHourlyData = (baseConsumption: number): HourlyConsumption[] => {
    const data: HourlyConsumption[] = [];
    for (let i = 0; i < 24; i++) {
        const hour = `${i.toString().padStart(2, '0')}:00`;
        // Simulate consumption peaks in the morning and evening
        let consumption;
        if (i > 6 && i < 10) { // Morning peak
            consumption = baseConsumption + Math.random() * 20;
        } else if (i > 18 && i < 22) { // Evening peak
            consumption = baseConsumption + Math.random() * 25;
        } else {
            consumption = baseConsumption + Math.random() * 10;
        }
        data.push({ hour, consumption: Math.round(consumption) });
    }
    return data;
};

// Helper to get the number of days in a month
const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();


// --- NEW DATA FUNCTIONS ---

export const getHourlyConsumptionForDay = (polizaSubm: string, day: Date): HourlyConsumption[] => {
    // We don't have real hourly data, so we'll simulate it based on daily average
    const userDayRecord = typedConsumptionData.find(d => {
        const recordDate = new Date(d.lectura_fecha);
        return d.poliza_subm === polizaSubm &&
               recordDate.getFullYear() === day.getFullYear() &&
               recordDate.getMonth() === day.getMonth() &&
               recordDate.getDate() === day.getDate();
    });

    const dailyTotal = userDayRecord ? userDayRecord.consum_registrat_m3 * 1000 : 15000; // Default to 15k L if no data
    const baseHourlyConsumption = dailyTotal / 24 / 2; // A base to add randomness to
    return generateHourlyData(baseHourlyConsumption);
}


export const getDailyConsumptionForMonth = (polizaSubm: string, year: number, month: number): DailyConsumption[] => {
    const userData = typedConsumptionData.filter(d => {
        const recordDate = new Date(d.lectura_fecha);
        return d.poliza_subm === polizaSubm &&
               recordDate.getFullYear() === year &&
               recordDate.getMonth() === month;
    });

    // If we have real daily records for the month, use them
    if (userData.length > 1) {
        return userData.map(record => ({
            date: new Date(record.lectura_fecha).toLocaleDateString('ca-ES', { day: 'numeric' }),
            consumption: Math.round(record.consum_registrat_m3 * 1000),
        })).sort((a, b) => parseInt(a.date) - parseInt(b.date));
    }
    
    // Otherwise, simulate daily data for the month
    const monthlyRecord = typedConsumptionData.find(d => {
       const recordDate = new Date(d.lectura_fecha);
        return d.poliza_subm === polizaSubm &&
               recordDate.getFullYear() === year &&
               recordDate.getMonth() === month;
    });

    const dailyData: DailyConsumption[] = [];
    const numDays = daysInMonth(year, month);
    const monthlyTotal = monthlyRecord ? monthlyRecord.consum_registrat_m3 * 1000 : 450000; // Default to 450k L
    const averageDaily = monthlyTotal / numDays;

    for (let i = 1; i <= numDays; i++) {
        // Simulate weekend vs weekday
        const dayOfWeek = new Date(year, month, i).getDay();
        const variation = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.2 : 0.9; // Higher on weekends
        const consumption = averageDaily * variation + (Math.random() - 0.5) * 5000; // Add some noise
        dailyData.push({
            date: i.toString(),
            consumption: Math.round(consumption),
        });
    }
    return dailyData;
}


export const getMonthlyConsumptionForYear = (polizaSubm: string, year: number) => {
    const userData = typedConsumptionData.filter(d => {
        const recordDate = new Date(d.lectura_fecha);
        return d.poliza_subm === polizaSubm && recordDate.getFullYear() === year;
    });
    
    const monthlyTotals: { [key: number]: number } = {};
    const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];

    userData.forEach(record => {
        const date = new Date(record.lectura_fecha);
        const month = date.getMonth();
        if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += record.consum_registrat_m3;
    });

    const result: MonthlyConsumption[] = [];
    for (let i = 0; i < 12; i++) {
        result.push({
            month: monthNames[i],
            consumption: monthlyTotals[i] ? Math.round(monthlyTotals[i] * 1000) : 0,
        });
    }
    return result;
};


// --- LEGACY & PAGE-SPECIFIC DATA ---
// These are kept for other pages that might still use them.

export const getMonthlyConsumptionForUser = (polizaSubm: string) => {
    const userData = typedConsumptionData.filter(d => d.poliza_subm === polizaSubm);
    const monthlyTotals: { [key: string]: number } = {};
    const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];

    userData.forEach(record => {
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
        consumption: Math.round(consumption * 1000), // m3 to liters
    })).slice(-12);
};

export const getAverageMonthlyConsumption = () => {
    const monthlyTotals: { [key: string]: number } = {};
    const monthNames = ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"];

    typedConsumptionData.forEach(record => {
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
        consumption: Math.round(consumption * 1000),
    })).slice(-12);
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
