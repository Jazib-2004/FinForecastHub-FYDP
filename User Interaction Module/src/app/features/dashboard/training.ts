export type DatasetType = "Tiny" | "Small" | "Standard" | "Large" | "Very Large" | "Insufficient Data";
import largemodel from "./largemodeltraining";

export default function training(
  preprocessedData: Record<string, { [key: string]: any }>,
  featureName: string
): void {
  console.log("Training started...");
  console.log("Feature Name:", featureName);
  console.log("Preprocessed Data:", preprocessedData);

  // Extract years from the keys of the dataset
  const years = new Set(
    Object.keys(preprocessedData).map((date) => new Date(date).getFullYear())
  );

  // Count the number of unique years
  const yearCount = years.size;

  // Determine the category
  let datasetType: DatasetType; // Use a variable to hold the classification

  if (yearCount >= 2 && yearCount <= 5) {
    datasetType = "Tiny";
  } else if (yearCount >= 6 && yearCount <= 10) {
    datasetType = "Small";
  } else if (yearCount >= 11 && yearCount <= 18) {
    datasetType = "Standard";
  } else if (yearCount >= 19 && yearCount <= 30) {
    datasetType = "Large";
    largemodel(preprocessedData, featureName)
  } else if (yearCount > 30) {
    datasetType = "Very Large";
  } else {
    datasetType = "Insufficient Data";
  }

  console.log(`The dataset spans ${yearCount} years and is classified as: ${datasetType}`);

  
}
