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
      <>
        <Table>
          <TableCaption>A summary of your dataset</TableCaption>
          <TableHeader>
            <TableRow>
              {columnNames.map((column: string, index: number) => (
                <TableHead className="w-[100px]" key={index}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {rows.map((row: any[], rowIndex: number) => (
              <TableRow key={rowIndex}>
                {row.map((cell: string, cellIndex: number) => (
                  <TableCell className="font-medium" key={cellIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };
  
  export default Resulttable;
  