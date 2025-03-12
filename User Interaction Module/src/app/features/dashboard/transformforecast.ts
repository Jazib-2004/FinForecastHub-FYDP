import { Forecast, Forecasts, TransformedForecast } from "@/app/types/forecast";

export const transformForecastData = (
  forecasts?: Forecasts | null
): TransformedForecast[] => {
  if (!forecasts) return [];
  
  return Object.entries(forecasts).map(([date, forecast]) => {
    // Get first key-value pair from forecast object
    const [metric, value] = Object.entries(forecast)[0];
    console.log(metric, value)
    
    return {
      date: new Date(date),
      metric,  // Dynamic metric name (e.g., "Truck Sales")
      value    // Numeric value
    };
  });
};