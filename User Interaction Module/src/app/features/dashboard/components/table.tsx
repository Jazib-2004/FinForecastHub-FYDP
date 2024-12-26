import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ParseResult } from "papaparse";

type FeatureselectProps = {
  results: ParseResult<any>;
};

const Resulttable = ({ results }: FeatureselectProps) => {
  const columnNames = results.data[0]; // Get the first row for column names
  const rows = results.data.slice(1, 5); // Get rows 1 to 4 (excluding header row)

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
      <Table className="min-w-full bg-white">
        <TableCaption className="text-sm text-gray-500">
          A summary of your dataset
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {columnNames.map((column: string, index: number) => (
              <TableHead
                key={index}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row: any[], rowIndex: number) => (
            <TableRow
              key={rowIndex}
              className={`hover:bg-gray-50 ${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {row.map((cell: string, cellIndex: number) => (
                <TableCell
                  key={cellIndex}
                  className="px-4 py-2 text-sm text-gray-600 border-t border-gray-300"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Resulttable;
