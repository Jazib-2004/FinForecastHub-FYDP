import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdTableRows, MdDataset } from "react-icons/md";
import { FaTableColumns } from "react-icons/fa6";

export default function Metadata() {
  return (
    <>
      <div className="w-full flex flex-row space-x-6"> 
        {/* Card 1 */}
        <Card className="w-1/3">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <MdTableRows size={40} className="text-blue-600" />
              </Avatar>
              <div>
                <CardTitle>No. of Rows</CardTitle>
                <CardDescription>1000</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Card 2 */}
        <Card className="w-1/3">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <FaTableColumns size={35} className="text-red-600" />
              <div>
                <CardTitle>No. of Columns</CardTitle>
                <CardDescription>15</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Card 3 */}
        <Card className="w-1/3">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <MdDataset size={40} className="text-blue-600" />
              </Avatar>
              <div>
                <CardTitle>Name of Dataset</CardTitle>
                <CardDescription>Random</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
