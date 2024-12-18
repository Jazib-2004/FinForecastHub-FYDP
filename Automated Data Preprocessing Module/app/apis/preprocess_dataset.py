from fastapi import APIRouter, HTTPException
import pandas as pd
from typing import Dict, Any

router = APIRouter()

def is_date_column(col):
    # Your existing date formats logic for identifying date columns
    date_formats = [
        '%Y-%m-%d',          # ISO 8601
        '%Y-%m-%dT%H:%M:%S', # ISO 8601 with time
        '%Y-%m-%dT%H:%M:%SZ', # ISO 8601 with UTC
        '%Y-%m-%dT%H:%M:%S%z', # ISO 8601 with timezone
        '%m/%d/%Y',          # US format
        '%m-%d-%Y',          # US format with dashes
        '%m/%d/%y',          # US format with two-digit year
        '%d/%m/%Y',          # European format
        '%d-%m-%Y',          # European format with dashes
        '%d/%m/%y',          # European format with two-digit year
        '%Y.%m.%d',          # Dot-separated format
        '%Y%m%d',            # Compact format
        '%d %B %Y',          # Day Month Year
        '%B %d, %Y',         # Month Day, Year
        '%Y %B %d',          # Year Month Day
        '%H:%M:%S',          # Time only
        '%I:%M %p',          # Time with AM/PM
        '%H%M',              # Compact time
        '%Y-%m-%d %H:%M:%S', # Date and time
        '%m/%d/%Y %I:%M %p', # US format with time
        '%d/%m/%Y %H:%M',    # European format with time
    ]

    # Try to convert the column using each format
    for fmt in date_formats:
        try:
            pd.to_datetime(col, format=fmt, errors='raise')
            return True
        except (ValueError, TypeError):
            continue

    return False 

@router.post("/preprocess-dataset/")
def preprocess_dataset(data: Dict[str, Any]):
    """
    Preprocess the dataset for the selected feature.

    Args:
        data (Dict): A dictionary containing the parsed dataset and selected feature name.

    Returns:
        Dict: A response containing the preprocessed dataset and feature names.
    """
    try:
        # Extract dataset and selected feature
        raw_data = data['dataset']
        selected_feature = data['selected_feature']

        # Use the first row as column names
        column_names = raw_data[1]
        dataset = pd.DataFrame(raw_data[2:], columns=column_names)

        # Ensure the selected feature exists
        if selected_feature not in dataset.columns:
            raise HTTPException(
                status_code=400, 
                detail=f"Selected feature '{selected_feature}' not found in dataset."
            )

        # Step 1: Identify the date column
        date_column = None
        for col in dataset.columns:
            try:
                if is_date_column(dataset[col]):
                    date_column = col
                    break
            except Exception:
                continue

        if not date_column:
            raise HTTPException(
                status_code=400, 
                detail="No valid date column found in the dataset."
            )

        # Step 2: Keep only the date column and selected feature
        dataset = dataset[[date_column, selected_feature]]

        # Step 3: Handle missing values and parse dates
        dataset[date_column] = pd.to_datetime(dataset[date_column], errors="coerce")
        dataset.dropna(subset=[date_column], inplace=True)
        dataset[selected_feature] = pd.to_numeric(dataset[selected_feature], errors="coerce")
        dataset[selected_feature].fillna(dataset[selected_feature].median(), inplace=True)

        # Step 4: Group by month and sum the selected feature
        dataset["monthly_date"] = dataset[date_column].dt.to_period("M")
        monthly_data = dataset.groupby("monthly_date")[selected_feature].sum().reset_index()

        # Step 5: Convert the month column back to a datetime format and sort
        monthly_data["monthly_date"] = monthly_data["monthly_date"].dt.to_timestamp()
        monthly_data.set_index("monthly_date", inplace=True)
        monthly_data.sort_index(inplace=True)
        print(monthly_data)

        return {
            "status": "success",
            "preprocessed_data": monthly_data.to_dict(orient="index"),
            "feature_name": selected_feature
        }

    except KeyError as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Missing expected key in input data: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"An error occurred during preprocessing: {str(e)}"
        )
