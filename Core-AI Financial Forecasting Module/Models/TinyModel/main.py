import os
import pandas as pd
from data_preparer import DataPreparer
from TinyModel.train_in import train_model as train_in_sample
from TinyModel.config import file_path,date_index,forecast_feature, logs_dir, plot_dir
from TinyModel.train_out import train_model as train_out_sample
from TinyModel.losses import visualize_losses
import matplotlib.pyplot as plt
from fastapi import APIRouter
from sktime.utils.plotting import plot_series
from sklearn.preprocessing import StandardScaler

smallRouter = APIRouter()

@smallRouter.post('/train')
async def main(file_path,forecast_feature,date_index):

    # Ensure the plots directory exists
    if not os.path.exists(plot_dir):
        print(f"Creating directory: {plot_dir}")
        os.makedirs(plot_dir, exist_ok=True)
    else:
        print(f"Directory already exists: {plot_dir}")
    
    # prepare data
    data_preparer = DataPreparer(file_path, forecast_feature, date_index)

    data_preparer.load_data()
    data_crafter = data_preparer.craft_dataset()
    scaler = data_crafter['scaler']
    crafted_sales_data = data_crafter['data']

    # data_preparer.plot_data()
    data_preparer.sort_dataset()
    crafted_sales_data = data_preparer.get_crafted_data()

    # train in-sampling model
    train_in_sample(crafted_sales_data,logs_dir+"\in_sampling_logs")

    # train out-sampling model
    trained_model = train_out_sample(crafted_sales_data,logs_dir+"\out_sampling_logs")
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
    visualize_losses(logs_dir+"\in_sampling_logs","In Sampling")

    # extract and visualize train-out-sampling losses
    visualize_losses(logs_dir+"\out_sampling_logs", "Out Sampling")

    return {
        "status":"success",
        "message":"model trained successfully",
        "forecasts":forecasts.to_dict(orient="index")}
