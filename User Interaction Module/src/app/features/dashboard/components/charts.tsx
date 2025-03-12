import { Forecasts } from "@/app/types/forecast";
import { AreaChart1 } from "./areachart";
import { PieChart1 } from "./piechart";

interface ChartProps {
  forecasts: Forecasts;
}

export default function Charts({ forecasts }: ChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <AreaChart1 forecasts={forecasts} />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <PieChart1 forecasts={forecasts} />
      </div>
    </div>
  );
}
