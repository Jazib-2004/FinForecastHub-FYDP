// types/forecast.d.ts

export type Forecast = {
  average_price: number;
};

export type Forecasts = {
  [date: string]: Forecast;
};
