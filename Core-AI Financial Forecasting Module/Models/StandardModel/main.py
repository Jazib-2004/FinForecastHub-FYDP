import os
import pandas as pd
import json
from data_preparer import DataPreparer
from StandardModel.train_in import train_model as train_in_sample
from StandardModel.config import logs_dir, plot_dir
from StandardModel.train_out import train_model as train_out_sample
from StandardModel.losses import visualize_losses
import matplotlib.pyplot as plt
from fastapi import APIRouter
from sktime.utils.plotting import plot_series
from sklearn.preprocessing import MinMaxScaler
from typing import Dict, Any

standardRouter = APIRouter()

@standardRouter.post('/train')
async def main(processed_data:Dict[str, Any]):

    processed_data = pd.DataFrame.from_dict(processed_data, orient="index")
    processed_data.index = pd.to_datetime(processed_data.index)
    print(processed_data.head())

    # scale dataset
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(processed_data)
    
    scaled_data = pd.DataFrame(scaled_data,columns=processed_data.columns,index=processed_data.index)

    # Ensure the plots directory exists
    if not os.path.exists(plot_dir):
        os.makedirs(plot_dir, exist_ok=True)
    else:
        print(f"Directory already exists: {plot_dir}")
    

    # train in-sampling model
    # train_in_sample(scaled_data,logs_dir+"\in_sampling_logs")

    # train out-sampling model
    trained_model = train_out_sample(scaled_data,logs_dir+"\out_sampling_logs")
    data_scaled = trained_model['data']
    forecasts_scaled = trained_model['forecasts']

    data = scaler.inverse_transform(data_scaled)
    forecasts = scaler.inverse_transform(forecasts_scaled)

    data = pd.DataFrame(data,columns=data_scaled.columns, index=data_scaled.index)
    forecasts = pd.DataFrame(forecasts,columns=forecasts_scaled.columns, index=forecasts_scaled.index)

    # Plotting out-of-sample predictions
    plot_series(data,forecasts)

    # save fig to .png file
    plot_filename = os.path.join(plot_dir, "out_sampling_forecasts.png")
    plt.savefig(plot_filename, dpi=300)
    plt.close()
    print("Plot saved successfuly")
    

    # extract and visualize train-in-sampling losses
    # visualize_losses(logs_dir+"\in_sampling_logs","In Sampling")

    # extract and visualize train-out-sampling losses
    visualize_losses(logs_dir+"\out_sampling_logs", "Out Sampling")

    return {
        "status":"success",
        "message":"model trained successfully",
        "forecasts":forecasts.to_dict(orient="index")
    }