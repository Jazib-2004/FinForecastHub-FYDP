import { Areachart } from "./areachart";
import { Piechart } from "./piechart";

export default function Charts() {
  return (
    <div className="flex flex-row w-full justify-evenly space-x-6">
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
