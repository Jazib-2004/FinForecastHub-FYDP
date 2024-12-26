from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from LargeModel.main import largeRouter
from StandardModel.main import standardRouter
from TinyModel.main import tinyRouter

app = FastAPI(
    title="Core-AI Based Financial Forecasting Module",
    description="An API system for model training and evaluation of time-serires financial datasets",
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
app.include_router(largeRouter, prefix="/large", tags=["Train Large Model"])
app.include_router(standardRouter, prefix="/standard", tags=["Train Standard Model"])
app.include_router(tinyRouter,prefix="/tiny",tags=["Train Tiny Model"])



@app.get("/")
def root():
    return {"message": "Welcome to FinForecastHub's (Core-AI Based Financial Forecaster) Module"}

