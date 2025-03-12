import training from "./training";

interface Result {
  status: string;
  preprocessed_data: Record<string, { [key: string]: any }>;
  feature_name: string;
}

export default function Preprocess(
  parsedData: any,
  selectedColumns: string[],
  onModelResults: (results: any) => void // Add callback
): void {
  const headers = Object.keys(parsedData.data[0]);
  const formattedDataset = [
    headers,
    ...parsedData.data.map((row: any) =>
      headers.map((key: string) => row[key])
    ),
  ];

  console.log("Sending JSON data:", {
    dataset: formattedDataset,
    selected_feature: selectedColumns[0],
  });

  fetch("http://localhost:8000/preprocess/preprocess-dataset/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataset: formattedDataset,
      selected_feature: selectedColumns[0],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.detail || "Failed to preprocess dataset.");
        });
      }
      return response.json(); // Parse JSON if response is OK
    })
    .then((data: Result) => {
      console.log(`Status: ${data.status}`);
      console.log(`Feature: ${data.feature_name}`);
      console.log(`Preprocessed Data:`, data.preprocessed_data);

      // Call training with the correct arguments
      training(data.preprocessed_data, data.feature_name, onModelResults);
    })
    .catch((error) => {
      console.error("Error during preprocessing:", error);
    });
}
