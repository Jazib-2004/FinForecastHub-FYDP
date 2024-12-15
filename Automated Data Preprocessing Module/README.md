The Automated Data Preprocessing Module has the following 2 APIs.

1. validate_dataset API:
- Receives a dataset as input from the front-end, and is checked against multiple criteria for compatibility.
- The dataset is validated if:
  - It's file format is either CSV, Excel, JSON or Parquet files.
  - It contains at least 2 columns.
  - It contains a date column (the date format is checked against a predefined list of acceptable date formats, if the format is not in that list, the dataset will fail validation).
  - There is at least one numeric column in the dataset.
  - Once the date column has been identified, it is checked if the date values span at least 2 years.
- If any of the step fails, an HTTP error will occur with a descriptive message. This message must be sent to the front-end and must be displayed as a pop-up message, indicating error in the dataset uploaded by the user.
- If any other error occurs, it's an internal server error.
- If all these checks are cleared successfully, a list of all numeric feature names (excluding the date column) will be sent to the front-end, and must be displayed as a drop-down menu, from which a feature will be selected and the second API will come into play.

2. preprocess_dataset API:
- Receives the dataset as well as the selected feature (from the dropdown) menu as input from the front-end.
- Loads the dataset into a Pandas DataFrame.
- Checks if there is a date column (if the dataset has been validated already, this step won't cause any error).
- Checks if the selected feature exists in the dataset, if not, raises an error.
- Once the above checks are cleared, all columns are dropped except the date column and the selected feature.
- Missing values in either column are imputed.
- The date column is converted to monthly frequency, it is set as the index and sorted.
- It then outputs or sends the preprocessed DataFrame object and it's feature names to another API.
