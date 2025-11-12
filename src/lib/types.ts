export type HourlyConsumption = {
  hour: string;
  consumption: number;
}

export type DailyConsumption = {
  date: string;
  consumption: number;
};

export type MonthlyConsumption = {
  month: string;
  consumption: number;
};

export type YearlyConsumption = {
  year: string;
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

export type ConsumptionRecord = {
  FECHA_HORA: number;
  CONSUMO_REAL: number | null;
};
