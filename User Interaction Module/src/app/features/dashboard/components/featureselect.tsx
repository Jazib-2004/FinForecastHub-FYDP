"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ParseResult } from "papaparse";
import { useState } from "react";

type FeatureselectProps = {
  results: ParseResult<any> | null;
};

const Featureselect: React.FC<FeatureselectProps> = ({ results }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  if (!results || !results.data || results.data.length === 0) {
    return <div>No data available to display columns.</div>;
  }

  const columnNames = results.data[0];

  const handleCheckboxChange = (columnName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedColumns((prev) => [...prev, columnName]);
    } else {
      setSelectedColumns((prev) => prev.filter((col) => col !== columnName));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="mb-4 hover:text-white transition-colors duration-200"
        >
          Choose your parameters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 px-4 rounded-lg shadow-lg bg-white">
        {columnNames.map((column: string, index: number) => (
          <li
            key={index}
            className="flex items-center space-x-3 py-2 hover:bg-gray-100 rounded-md"
          >
            <Checkbox
              id={index.toString()}
              checked={selectedColumns.includes(column)}
              onCheckedChange={(checked: boolean) =>
                handleCheckboxChange(column, checked)
              }
              className="text-blue-600"
            />
            <div className="flex-1">
              <label
                htmlFor={index.toString()}
                className="text-sm font-medium text-gray-700"
              >
                {column}
              </label>
            </div>
          </li>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Featureselect;
