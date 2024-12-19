"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ParseResult } from "papaparse";
import { useState, useEffect } from "react";
import Preprocess from "../preprocess";

type FeatureselectProps = {
  results: ParseResult<any> | null;
  session_id?: string | null;
  parsedresults: any | null;
};

const Featureselect: React.FC<FeatureselectProps> = ({
  results,
  parsedresults,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  // Effect to call Preprocess only when a column is selected
  useEffect(() => {
    if (selectedColumn) {
      Preprocess(parsedresults, [selectedColumn]); // Pass selected column as an array
    }
  }, [selectedColumn, parsedresults]);

  if (!results || !results.data || results.data.length === 0) {
    return <div>No data available to display columns.</div>;
  }

  const columnNames = results.data[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="mb-4 hover:text-white transition-colors duration-200"
        >
          Select a Feature
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 px-4 rounded-lg shadow-lg bg-white w-56">
        <DropdownMenuLabel>Choose a Feature</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedColumn || ""}
          onValueChange={(value) => setSelectedColumn(value)}
        >
          {columnNames.map((column: string, index: number) => (
            <DropdownMenuRadioItem key={index} value={column}>
              {column}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Featureselect;
