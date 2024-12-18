from fastapi import FastAPI
from LargeModel.main import largeRouter
from StandardModel.main import standardRouter
from TinyModel.main import tinyRouter

app = FastAPI(
    title="Core-AI Based Financial Forecasting Module",
    description="An API system for model training and evaluation of time-serires financial datasets",
    version="1.0.0"
)

# Include routers
app.include_router(largeRouter, prefix="/large", tags=["Train Large Model"])
app.include_router(standardRouter, prefix="/standard", tags=["Train Standard Model"])
app.include_router(tinyRouter,prefix="/tiny",tags=["Train Tiny Model"])

@app.get("/")
def root():
    return {"message": "Welcome to FinForecastHub's (Core-AI Based Financial Forecaster) Module"}

