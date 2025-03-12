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
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

type FeatureselectProps = {
  results: ParseResult<any>;
};

const Resulttable = ({ results }: FeatureselectProps) => {
  const columnNames = results.data[0]; // Get the first row for column names
  const rows = results.data.slice(1, 5); // Get rows 1 to 4 (excluding header row)

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <Table className="min-w-full bg-white/90 backdrop-blur-sm">
        <TableCaption className="text-gray-500 text-sm p-4">
          First 5 rows from uploaded dataset
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            {columnNames.map((column: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
              <TableHead
                key={index}
                className="px-4 py-3 text-gray-600 font-medium text-sm"
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              {row.map((cell: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, cellIndex: Key | null | undefined) => (
                <TableCell
                  key={cellIndex}
                  className="px-4 py-3 text-gray-600 text-sm"
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
