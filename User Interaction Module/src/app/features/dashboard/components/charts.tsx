import { Areachart } from "./areachart";
import { Piechart } from "./piechart";

export default function Charts() {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-evenly space-y-6 sm:space-y-0 sm:space-x-6 h-full">
      {/* Area Chart */}
      <div className="flex-1">
        <Areachart />
      </div>
      
      {/* Pie Chart */}
      <div className="flex-1">
        <Piechart />
      </div>
    </div>
  );
}
