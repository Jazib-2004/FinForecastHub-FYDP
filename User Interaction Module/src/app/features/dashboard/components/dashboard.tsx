"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import Papa from "papaparse";
import Addalert from "./alert";
import Featureselect from "./featureselect";
import Resulttable from "./table";
import Dashboardheader from "@/app/features/dashboard/components/dashboardheader";
import Metadata from "./metadata";
import { PieChart } from "lucide-react";
import { Piechart } from "./piechart";
import Charts from "./charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [dataset, setDataset] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [parsedResults, setParsedResults] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataset(file);
    setShowError(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (dataset) {
      Papa.parse(dataset, {
        complete: function (results) {
          setParsedResults(results);
        },
      });
      setShowError(false);
      setShowSuccess(true);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }

    setTimeout(() => setShowSuccess(false), 1500);
    setTimeout(() => setShowError(false), 1500);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 space-y-6 bg-neutral-300">
      <Dashboardheader />
      
      <Metadata />
      <div className="flex flex-row w-full space-x-4">
        <Card>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Upload Your Dataset Below</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.json"
                  className="flex-1"
                />
                <Button type="submit" className="flex-shrink-0">
                  Submit
                </Button>
              </div>
              <div className="mt-4">
                <Addalert showError={showError} showSuccess={showSuccess} />
              </div>
              <div className="mt-4">
                <Featureselect results={parsedResults} />
              </div>
            </CardContent>
          </form>
        </Card>
        {parsedResults && (
          <div className="w-2/3 max-w-4xl space-y-6">
            <Resulttable results={parsedResults} />
          </div>
        )}
      </div>
      <Charts />
    </div>
  );
}
