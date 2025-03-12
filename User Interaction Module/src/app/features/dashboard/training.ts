export type DatasetType =
  | "Tiny"
  | "Small"
  | "Standard"
  | "Large"
  | "Very Large"
  | "Insufficient Data";
import largemodel from "./largemodeltraining";
import standardmodel from "./standardmodeltraining";
import tinymodel from "./tinymodeltraining";

interface TrainingResult {
  status: "success" | "error";
  message: string;
  forecasts?: any[];
  error?: string;
}

export default async function training(
  preprocessedData: Record<string, { [key: string]: any }>,
  featureName: string,
  callback: (results: TrainingResult) => void
): Promise<void> {
  console.log("Training started...");
  console.log("Feature Name:", featureName);

  try {
    // Validate preprocessed data
    if (!preprocessedData || Object.keys(preprocessedData).length === 0) {
      throw new Error("Invalid preprocessed data");
    }

    // Extract years from the dataset keys
    const years = new Set(
      Object.keys(preprocessedData).map((date) => {
        const year = new Date(date).getFullYear();
        if (isNaN(year)) throw new Error(`Invalid date format: ${date}`);
        return year;
      })
    );

    const yearCount = years.size;
    let datasetType: DatasetType;
    let results: TrainingResult | undefined;

    // Determine dataset type and run appropriate model
    if (yearCount >= 2 && yearCount <= 5) {
      datasetType = "Tiny";
      results = await tinymodel(preprocessedData, featureName);
    } else if (yearCount >= 6 && yearCount <= 10) {
      datasetType = "Small";
      results = {
        status: "error",
        message: "Small dataset type not implemented yet",
      };
    } else if (yearCount >= 11 && yearCount <= 18) {
      datasetType = "Standard";
      results = await standardmodel(preprocessedData, featureName);
    } else if (yearCount >= 19 && yearCount <= 30) {
      datasetType = "Large";
      results = await largemodel(preprocessedData, featureName);
    } else if (yearCount > 30) {
      datasetType = "Very Large";
      results = {
        status: "error",
        message: "Very Large dataset type not implemented yet",
      };
    } else {
      datasetType = "Insufficient Data";
      results = {
        status: "error",
        message: "Insufficient data for training",
      };
    }

    console.log(`Dataset classification: ${datasetType} (${yearCount} years)`);

    // Ensure we always call the callback with a result
    if (results) {
      console.log("Training results:", results);
      callback(results);
    } else {
      throw new Error("No results generated from training");
    }
  } catch (error) {
    console.error("Training error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown training error";
    callback({
      status: "error",
      message: "Training failed",
      error: errorMessage,
    });
  }
}
