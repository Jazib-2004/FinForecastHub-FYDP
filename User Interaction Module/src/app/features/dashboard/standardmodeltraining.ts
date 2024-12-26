export default async function standardmodel(
    preprocessedData: Record<string, { [key: string]: any }>,
    featureName: string
  ): Promise<void> {
    console.log("Standard model training started...");
    console.log("Feature Name:", featureName);
    console.log("Preprocessed Data:", preprocessedData);
  
    try {
      // Make a POST request to the FastAPI backend
       
    
      const response = await fetch("http://localhost:8001/standard/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preprocessedData), // Send the processed data
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to train standard model.");
      }
  
      // Parse the response
      const result = await response.json();
  
      // Log the result
      console.log("Training completed successfully!");
      console.log("Status:", result.status);
      console.log("Message:", result.message);
      console.log("Forecasts:", result.forecasts);
  
      // Further actions can be taken with `result.forecasts` if needed
    } catch (error) {
      console.error("Error during standard model training:", error);
    }
  }
  