"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, FormEvent } from "react";
import Papa from "papaparse";
import Addalert from "./alert";
import Featureselect from "./featureselect";
import Resulttable from "./table";
import Dashboardheader from "@/app/features/dashboard/components/dashboardheader";
import Metadata from "./metadata";
import Preprocess from "../preprocess";
import Charts from "./charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [dataset, setDataset] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [parsedResults, setParsedResults] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataset(file);
    setShowError(false);
    setErrorMessage(""); // Clear any previous error messages
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (dataset) {
      Papa.parse(dataset, {
        complete: function (results) {
          setParsedResults(results);

          // Create a Blob object from the parsed CSV data
          // Create FormData to send the file to the server
          const formData = new FormData();
          formData.append("file", dataset, dataset.name);

          // Send the file to the backend
          fetch("http://localhost:8000/validate/validate-dataset/", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((errorData) => {
                  throw new Error(
                    errorData.detail || "Failed to upload dataset."
                  );
                });
              }
              return response.json(); // Parse JSON if response is OK
            })
            .then((data) => {
              if (data.status === "success") {
                setShowSuccess(true);
                setShowError(false);
                setValidated("yes");
              } else {
                setShowError(true);
                setShowSuccess(false);
              }
            })
            .catch((error) => {
              console.error("Error uploading file:", error);

              // Display the error message from the backend
              setErrorMessage(error.message); // Use the message from the error object

             

              setShowError(true);
              setShowSuccess(false);
              setTimeout(() => setShowSuccess(false), 1500);
              setTimeout(() => setShowError(false), 1500);
            });
        },
      });
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 space-y-6 bg-neutral-300 h-full">
      <Dashboardheader />

      <Metadata />
      <Charts />
      <div className="flex flex-row w-full space-x-4">

        <Card className="h-[250px]">
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
              <div className="mt-4 h-full">
                <Addalert
                  showError={showError}
                  showSuccess={showSuccess}
                  errorMessage={errorMessage}
                />
              </div>
              <div className="mt-4">
                <Featureselect results={parsedResults} parsedresults={parsedResults} />
              </div>
            </CardContent>
          </form>
        </Card>
        {parsedResults && (
          <div className="w-2/3 max-w-4xl space-y-6 h-full">
            <Resulttable results={parsedResults} />
          </div>
        )}
      
      </div>
   
    </div>
  );
}
