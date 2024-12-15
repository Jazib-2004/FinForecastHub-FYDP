from fastapi import APIRouter, UploadFile, HTTPException
import pandas as pd
from io import BytesIO
import uuid

# In-memory storage for validated datasets
validated_datasets = {}

def is_date_column(col):
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

def calculate_year_span(df, date_column):
    try:
        # Convert the date column to datetime format
        df[date_column] = pd.to_datetime(df[date_column], errors='coerce')

        # Check for invalid or missing dates
        if df[date_column].isnull().all():
            raise ValueError("The date column contains no valid dates.")

        # Find the earliest and latest dates
        earliest_date = df[date_column].min()
        latest_date = df[date_column].max()

        # Calculate the year span
        year_span = latest_date.year - earliest_date.year + 1

        return year_span

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Year span calculation error: {str(e)}")

router = APIRouter()

@router.post("/validate-dataset/")
def validate_dataset(file: UploadFile):
    try:
        # Step 1: Validate file format (can it be loaded into a Pandas DataFrame?)
        file_extension = file.filename.split(".")[-1].lower()
        if file_extension in ["csv"]:
            df = pd.read_csv(BytesIO(file.file.read()))
        elif file_extension in ["xlsx", "xls"]:
            df = pd.read_excel(BytesIO(file.file.read()))
        elif file_extension in ["parquet"]:
            df = pd.read_parquet(BytesIO(file.file.read()))
        elif file_extension in ["json"]:
            df = pd.read_json(BytesIO(file.file.read()))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a dataset only in CSV, Excel, JSON or Parquet formats.")

        # Step 2: Check if there are at least 2 columns
        if len(df.columns) < 2:
            raise HTTPException(status_code=400, detail="Dataset must have at least 2 columns, a date column and a numeric column to forecast.")

        # Step 3: Ensure there is a date column
        date_column = None
        for col in df.columns:
            if is_date_column(df[col]):
                date_column = col
                break

        if not date_column:
            raise HTTPException(status_code=400, detail="No date column found. Dataset is not time series.")

        # Step 4: Ensure there is at least one numeric column to forecast
        numeric_columns = [col for col in df.columns if pd.api.types.is_numeric_dtype(df[col])]
        if not numeric_columns:
            raise HTTPException(status_code=400, detail="No numeric column found for forecasting.")

        # Step 5: Check the year span
        year_span = calculate_year_span(df, date_column)
        if year_span < 2:
            raise HTTPException(status_code=400, detail="Insufficient data: Dataset must span at least 2 years.")
        
        # Step 6: Return numeric columns only (excluding the date column)
        numeric_columns_without_date = [col for col in numeric_columns if col != date_column]

        # Step 7: Generate a unique session ID and store the dataset
        session_id = str(uuid.uuid4())
        validated_datasets[session_id] = df

        return {
            "status": "success",
            "session_id": session_id,
            "features": numeric_columns_without_date
        }

    except HTTPException as http_exc:
        raise http_exc

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")