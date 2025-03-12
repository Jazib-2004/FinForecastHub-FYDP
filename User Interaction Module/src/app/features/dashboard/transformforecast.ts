// utils/transformForecast.ts

import { Forecast, Forecasts } from "@/app/types/forecast";

export const transformForecastData = (forecasts?: Forecasts | null) => {

  if (!forecasts) return [];
  return Object.entries(forecasts).map(([date, forecast]) => ({
    date: new Date(date),
    average_price: forecast.average_price,
    
  }))
  ;
  
};