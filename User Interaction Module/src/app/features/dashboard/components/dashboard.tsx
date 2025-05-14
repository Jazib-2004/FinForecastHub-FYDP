"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import Papa from "papaparse";
import Addalert from "./alert";
import Featureselect from "./featureselect";
import Resulttable from "./table";
import Dashboardheader from "@/app/features/dashboard/components/dashboardheader";
import Metadata from "./metadata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Charts from "./charts";
import LandingLoaderPage from "../loader";

type ModelResults = {
  status?: string;
  message?: string;
  forecasts?: Record<string, { average_price: number }>;
  datatype?: string;
};

// Image path helper function
const getImagePath = (datatype: string) => {
  const basePath =
    "../../../../../../Core-AI Financial Forecasting Module/Results/";
  switch (datatype) {
    case "Large":
      return `${basePath}Large Model/plots/out_sampling_forecasts.png`;
    case "Standard": // Changed to match exact case
      return `${basePath}Standard Model/plots/out_sampling_forecasts.png`;
    case "Tiny":
      return `${basePath}Tiny Model/plots/out_sampling_forecasts.png`;
    default:
      return "";
  }
};

export default function Dashboard() {
  const [modelResults, setModelResults] = useState<ModelResults | null>(null);
  const [dataset, setDataset] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [parsedResults, setParsedResults] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataset(file);
    setShowError(false);
    setErrorMessage("");
  }, []);

  // Update the handleSubmit and handleModelResults functions:

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!dataset) {
        setShowError(true);
        setShowSuccess(false);
        return;
      }

      try {
        setIsAnalyzing(true);
        const results = await new Promise<any>((resolve) => {
          Papa.parse(dataset, { complete: resolve });
        });

        setParsedResults(results);

        const formData = new FormData();
        formData.append("file", dataset, dataset.name);

        const response = await fetch(
          "http://localhost:8000/validate/validate-dataset/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to upload dataset.");
        }

        const data = await response.json();
        if (data.status === "success") {
          setShowSuccess(true);
          setShowError(false);
          setValidated("yes");
        } else {
          throw new Error("Validation failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
        setShowError(true);
        setShowSuccess(false);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [dataset]
  );

  const handleModelResults = useCallback((results: ModelResults) => {
    setModelResults(results);
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 space-y-6 bg-gray-50 min-h-screen">
      {(isAnalyzing || isTraining) && <LandingLoaderPage />}

      <Dashboardheader />
      <Metadata />

      <div className="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4">
        <Card className="lg:w-1/3 w-full bg-gradient-to-br from-white to-gray-50 shadow-sm">
          <form onSubmit={handleSubmit} className="w-full">
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold text-lg">
                Upload Dataset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="relative group">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv,.xlsx,.json"
                    className="w-full cursor-pointer border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors py-8 text-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-gray-500 group-hover:text-indigo-600 transition-colors">
                      {dataset ? dataset.name : "Drag & drop or browse files"}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  disabled={isAnalyzing || isTraining}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Dataset"}
                </Button>
              </div>

              <div className="mt-4">
                <Addalert
                  showError={showError}
                  showSuccess={showSuccess}
                  errorMessage={errorMessage}
                />
              </div>

              {parsedResults && (
                <div className="mt-4">
                  <Featureselect
                    results={parsedResults}
                    parsedresults={parsedResults}
                    onModelResults={handleModelResults}
                    isTraining={isTraining}
                  />
                </div>
              )}
            </CardContent>
          </form>
        </Card>

        {parsedResults && (
          <div className="lg:w-2/3 w-full space-y-6">
            <Resulttable results={parsedResults} />
          </div>
        )}
      </div>

      {/* Dataset Type Display */}

      {/* Charts Display */}
      {!isTraining && modelResults?.forecasts && (
        <Charts forecasts={modelResults.forecasts} />
      )}
    </div>
  );
}
