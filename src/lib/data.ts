import type {
  DailyConsumption,
  MonthlyConsumption,
  YearlyConsumption,
  Bill,
} from './types';

export const dailyConsumption: DailyConsumption[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      consumption: Math.floor(Math.random() * (150 - 80 + 1) + 80), // Random value between 80 and 150
    };
  }
);

export const monthlyConsumption: MonthlyConsumption[] = [
  { month: 'Jan', consumption: 3200 },
  { month: 'Feb', consumption: 3000 },
  { month: 'Mar', consumption: 3500 },
  { month: 'Apr', consumption: 3700 },
  { month: 'May', consumption: 4200 },
  { month: 'Jun', consumption: 4800 },
  { month: 'Jul', consumption: 5100 },
  { month: 'Aug', consumption: 4900 },
  { month: 'Sep', consumption: 4300 },
  { month: 'Oct', consumption: 3800 },
  { month: 'Nov', consumption: 3400 },
  { month: 'Dec', consumption: 3600 },
];

export const yearlyConsumption: YearlyConsumption[] = [
  { year: 2020, consumption: 45000 },
  { year: 2021, consumption: 47000 },
  { year: 2022, consumption: 46500 },
  { year: 2023, consumption: 48200 },
  { year: 2024, consumption: 47500 },
];

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
