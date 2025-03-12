import { Avatar } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdTableRows, MdDataset } from "react-icons/md";
import { FaTableColumns } from "react-icons/fa6";

export default function Metadata() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <MdTableRows className="text-indigo-600 text-xl" />
            </div>
            <div>
              <CardTitle className="text-gray-700 text-sm font-medium">
                Total Rows
              </CardTitle>
              <CardDescription className="text-indigo-600 text-2xl font-semibold">
                1,024
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Card 2 */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FaTableColumns className="text-indigo-600 text-xl" />
            </div>
            <div>
              <CardTitle className="text-gray-700 text-sm font-medium">
                No. of Columns
              </CardTitle>
              <CardDescription className="text-indigo-600 text-2xl font-semibold">
                15
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Card 3 */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <MdDataset className="text-indigo-600 text-xl" />
            </div>
            <div>
              <CardTitle className="text-gray-700 text-sm font-medium">
                Name of Dataset
              </CardTitle>
              <CardDescription className="text-indigo-600 text-2xl font-semibold">
                Random
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
