export default function Preprocess(parsedData: any, selectedColumns: string[]): void {
    // Extract headers (assuming the dataset is in a tabular format with data and headers)
    const headers = Object.keys(parsedData.data[0]); // Get column names from the first object
    const formattedDataset = [
      headers, // Add headers as the first row
      ...parsedData.data.map((row: any) => headers.map((key: string) => row[key])), // Map each row to an array of values
    ];
  
    console.log("Sending JSON data:", {
      dataset: formattedDataset, // Pass the formatted dataset
      selected_feature: selectedColumns[0], // Take the first feature as the selected one
    });
  
    // Sending formatted data to the backend
    fetch("http://localhost:8000/preprocess/preprocess-dataset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Content-type for sending JSON data
      },
      body: JSON.stringify({
        dataset: formattedDataset, // Pass the formatted dataset
        selected_feature: selectedColumns[0], // Take the first feature as the selected one
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
      .then((data) => {
        console.log(data); // Handle the response data here if needed
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }
  