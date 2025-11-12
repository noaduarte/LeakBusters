export type DailyConsumption = {
  date: string;
  consumption: number;
};

export type MonthlyConsumption = {
  month: string;
  consumption: number;
};

export type YearlyConsumption = {
  year: number;
  consumption: number;
};

export type Bill = {
  id: string;
  month: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  dueDate: string;
  statementUrl: string;
};

export type AppSettings = {
  databaseConnectionString: string;
  modelDataUri: string;
};
