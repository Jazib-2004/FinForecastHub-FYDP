import os
import pandas as pd
from data_preparer import DataPreparer
from StandardModel.train_in import train_model as train_in_sample
from StandardModel.config import file_path,date_index,forecast_feature, logs_dir, plot_dir
from StandardModel.train_out import train_model as train_out_sample
from StandardModel.losses import visualize_losses
import matplotlib.pyplot as plt
from fastapi import APIRouter


standardRouter = APIRouter()

@standardRouter.post('/train')
async def main(file_path,forecast_feature,date_index):

    
    # Ensure the plots directory exists
    if not os.path.exists(plot_dir):
        print(f"Creating directory: {plot_dir}")
        os.makedirs(plot_dir, exist_ok=True)
    else:
        print(f"Directory already exists: {plot_dir}")
    
    # prepare data
    data_preparer = DataPreparer(file_path, forecast_feature, date_index)

    await data_preparer.load_data()
    crafted_sales_data = await data_preparer.craft_dataset()
    # data_preparer.plot_data()
    await data_preparer.sort_dataset()
    crafted_sales_data = await data_preparer.get_crafted_data()

    print(crafted_sales_data.head())
    # train in-sampling model
    await train_in_sample(crafted_sales_data,logs_dir+"\in_sampling_logs")

    # train out-sampling model
    await train_out_sample(crafted_sales_data,logs_dir+"\out_sampling_logs")

    # extract and visualize train-in-sampling losses
    await visualize_losses(logs_dir+"\in_sampling_logs","In Sampling")

    # extract and visualize train-out-sampling losses
    await visualize_losses(logs_dir+"\out_sampling_logs", "Out Sampling")

    return {
        "status":"success",
        "message":"model trained successfully"
    }


main(file_path,forecast_feature,date_index)