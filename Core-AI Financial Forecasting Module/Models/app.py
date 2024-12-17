from fastapi import FastAPI
from LargeModel.main import largeRouter
from StandardModel.main import standardRouter

app = FastAPI(
    title="Core-AI Based Financial Forecasting Module",
    description="An API system for model training and evaluation of time-serires financial datasets",
    version="1.0.0"
)

# Include routers
app.include_router(largeRouter, prefix="/large", tags=["Train Large Model"])
app.include_router(standardRouter, prefix="/standard", tags=["Train Standard Model"])

@app.get("/")
def root():
    return {"message": "Welcome to FinForecastHub's (Core-AI Based Financial Forecaster) Module"}

