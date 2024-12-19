from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from LargeModel.main import largeRouter
from StandardModel.main import standardRouter
from TinyModel.main import tinyRouter

# Create the FastAPI app
app = FastAPI(
    title="Core-AI Based Financial Forecasting Module",
    description="An API system for model training and evaluation of time-series financial datasets",
    version="1.0.0"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (or specify a list of domains e.g. ["https://example.com"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (e.g. GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(largeRouter, prefix="/large", tags=["Train Large Model"])
app.include_router(standardRouter, prefix="/standard", tags=["Train Standard Model"])
app.include_router(tinyRouter, prefix="/tiny", tags=["Train Tiny Model"])

@app.get("/")
def root():
    return {"message": "Welcome to FinForecastHub's (Core-AI Based Financial Forecaster) Module"}
