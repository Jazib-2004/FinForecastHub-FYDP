import pytest
from fastapi.testclient import TestClient
from app.main import app
import pandas as pd
import os

client = TestClient(app)

# Utility function to save DataFrame as file
def save_dataframe_as_file(df, filename, filetype):
    if filetype == "csv":
        df.to_csv(filename, index=False)
    elif filetype == "xlsx":
        df.to_excel(filename, index=False)
    elif filetype == "txt":
        df.to_csv(filename, index=False, sep="\t")

# Unit tests

# 1. File compatibility tests
def test_csv_file():
    df = pd.DataFrame({"date": ["2020-01-01", "2021-01-01"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 200
    os.remove("test.csv")

def test_xlsx_file():
    df = pd.DataFrame({"date": ["2020-01-01", "2021-01-01"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.xlsx", "xlsx")
    with open("test.xlsx", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 200
    os.remove("test.xlsx")

def test_txt_file():
    df = pd.DataFrame({"date": ["2020-01-01", "2021-01-01"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.txt", "txt")
    with open("test.txt", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 400  # Unsupported format
    os.remove("test.txt")

# 2. Date column presence tests
def test_with_date_column():
    df = pd.DataFrame({"date": ["2020-01-01", "2021-01-01"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 200
    os.remove("test.csv")

def test_without_date_column():
    df = pd.DataFrame({"value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 400
    os.remove("test.csv")

def test_with_wrongly_formatted_date_column():
    df = pd.DataFrame({"date": ["2020-01-01-01", "wrong-date"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 400
    os.remove("test.csv")

# 3. Year span tests
def test_year_span_three_years():
    df = pd.DataFrame({"date": ["2020-01-01", "2023-12-31"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 200
    os.remove("test.csv")

def test_year_span_one_year():
    df = pd.DataFrame({"date": ["2020-01-01", "2020-12-31"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 400
    os.remove("test.csv")

# 4. Column count tests
def test_one_column():
    df = pd.DataFrame({"date": ["2020-01-01", "2021-01-01"]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 400
    os.remove("test.csv")

def test_two_columns():
    df = pd.DataFrame({"date": ["2020-01-01", "2021-01-01"], "value": [10, 20]})
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 200
    os.remove("test.csv")

# 5. Fully passing test
def test_three_columns():
    df = pd.DataFrame({
        "date": ["2020-01-01", "2023-12-31"],
        "value1": [10, 20],
        "value2": [30, 40]
    })
    save_dataframe_as_file(df, "test.csv", "csv")
    with open("test.csv", "rb") as f:
        response = client.post("/api/v1/validate-dataset/", files={"file": f})
    assert response.status_code == 200
    os.remove("test.csv")