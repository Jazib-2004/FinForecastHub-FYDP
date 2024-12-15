from fastapi import FastAPI
from app.apis.validate_dataset import router as validate_dataset_router
from app.apis.preprocess_dataset import router as preprocess_data_router

app = FastAPI(
    title="Scenario-Based Financial Forecasting System",
    description="An API system for validating datasets and performing time series forecasting.",
    version="1.0.0"
)

# Include routers
app.include_router(validate_dataset_router, prefix="/api/v1", tags=["Dataset Validation"])
app.include_router(preprocess_data_router, prefix="/api/v1", tags=["Data Preprocessing"])

@app.get("/")
def root():
    return {"message": "Welcome to the Scenario-Based Financial Forecasting System API"}

