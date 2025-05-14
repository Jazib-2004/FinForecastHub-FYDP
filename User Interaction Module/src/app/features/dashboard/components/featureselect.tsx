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
import { Check, ChevronDown, Loader2 } from "lucide-react";

type FeatureselectProps = {
  results: ParseResult<any> | null;
  parsedresults: any | null;
  onModelResults: (results: any) => void;
  isTraining: boolean;
};

const Featureselect: React.FC<FeatureselectProps> = ({
  results,
  parsedresults,
  onModelResults,
  isTraining,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [localIsTraining, setLocalIsTraining] = useState(false);

  useEffect(() => {
    if (selectedColumn) {
      setLocalIsTraining(true);
      Preprocess(parsedresults, [selectedColumn], (results) => {
        onModelResults(results);
        setLocalIsTraining(false);
      });
    }
  }, [selectedColumn, parsedresults, onModelResults]);

  if (!results || !results.data || results.data.length === 0) {
    return (
      <div className="text-center text-sm text-gray-400 p-4 rounded-lg bg-gray-50/50">
        Upload a dataset to view available features
      </div>
    );
  }

  const columnNames = results.data[0];

  return (
    <div className="relative">
      {(isTraining || localIsTraining) && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
        </div>
      )}

      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between group hover:border-indigo-500 hover:bg-white/90 transition-all"
            disabled={isTraining || localIsTraining}
          >
            <span className="text-gray-500 group-hover:text-indigo-600 truncate">
              {selectedColumn || "Select a feature"}
            </span>
            {isTraining || localIsTraining ? (
              <Loader2 className="h-4 w-4 ml-2 animate-spin text-indigo-600" />
            ) : (
              <ChevronDown
                className={`h-4 w-4 ml-2 text-gray-400 group-hover:text-indigo-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-64 overflow-y-auto rounded-xl shadow-xl border border-gray-100 bg-white/95 backdrop-blur-sm"
        >
          <DropdownMenuLabel className="px-4 py-2 text-sm font-medium text-gray-500">
            Available Features
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100" />

          <DropdownMenuRadioGroup
            value={selectedColumn || ""}
            onValueChange={setSelectedColumn}
          >
            {columnNames.map((column: string, index: number) => (
              <DropdownMenuRadioItem
                key={index}
                value={column}
                className="pl-4 pr-6 py-2.5 text-sm text-gray-600 hover:bg-indigo-50/50 focus:bg-indigo-50/80 transition-colors cursor-pointer flex items-center justify-between"
                disabled={isTraining || localIsTraining}
              >
                <span className="truncate">{column}</span>
                {selectedColumn === column && (
                  <Check className="h-4 w-4 ml-2 text-indigo-600 shrink-0" />
                )}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Featureselect;
