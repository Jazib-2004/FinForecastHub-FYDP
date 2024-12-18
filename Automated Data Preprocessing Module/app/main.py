from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.apis.validate_dataset import router as validate_dataset_router
from app.apis.preprocess_dataset import router as preprocess_data_router

app = FastAPI(
    title="Scenario-Based Financial Forecasting System",
    description="An API system for validating datasets and performing time series forecasting.",
    version="1.0.0"
)

# Allow CORS for specific origins (adjust the URL as needed)
origins = [
    "http://localhost:3000",  # React development server URL
    "http://127.0.0.1:3000",  # Another possible React development server URL
    "https://yourfrontenddomain.com",  # Production frontend domain if applicable
]

# Add CORSMiddleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(validate_dataset_router, prefix="/validate", tags=["Dataset Validation"])
app.include_router(preprocess_data_router, prefix="/preprocess", tags=["Data Preprocessing"])

@app.get("/")
def root():
    return {"message": "Welcome to the Scenario-Based Financial Forecasting System API"}
