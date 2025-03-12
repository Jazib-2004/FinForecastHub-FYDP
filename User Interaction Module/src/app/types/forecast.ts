export type Forecast = {
  [key: string]: number;  // Allow any key with number value
};

export type Forecasts = {
  [date: string]: Forecast;
};

// Optional: Type for transformed data
export type TransformedForecast = {
  date: Date;
  metric: string;
  value: number;
};