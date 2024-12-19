import { Avatar } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdTableRows, MdDataset } from "react-icons/md";
import { FaTableColumns } from "react-icons/fa6";

export default function Metadata() {
  return (
    <div className="w-full flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-between">
      {/* Card 1 */}
      <Card className="w-full sm:w-1/3 flex-1">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <MdTableRows size={40} className="text-blue-600" />
            </Avatar>
            <div>
              <CardTitle className="text-lg">No. of Rows</CardTitle>
              <CardDescription className="text-base">1000</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Card 2 */}
      <Card className="w-full sm:w-1/3 flex-1">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <FaTableColumns size={35} className="text-red-600" />
            <div>
              <CardTitle className="text-lg">No. of Columns</CardTitle>
              <CardDescription className="text-base">15</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Card 3 */}
      <Card className="w-full sm:w-1/3 flex-1">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <MdDataset size={40} className="text-blue-600" />
            </Avatar>
            <div>
              <CardTitle className="text-lg">Name of Dataset</CardTitle>
              <CardDescription className="text-base">Random</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
