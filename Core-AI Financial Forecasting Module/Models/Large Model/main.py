import sys
import os
import pandas as pd
# Add the parent directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from data_preparer import DataPreparer
from train_in import train_model as train_in_sample
from config import file_path,date_index,forecast_feature, logs_dir, plot_dir
from train_out import train_model as train_out_sample
from losses import visualize_losses
import matplotlib.pyplot as plt


def main(file_path,forecast_feature,date_index):

    
    # Ensure the plots directory exists
    if not os.path.exists(plot_dir):
        print(f"Creating directory: {plot_dir}")
        os.makedirs(plot_dir, exist_ok=True)
    else:
        print(f"Directory already exists: {plot_dir}")
    
    # prepare data
    data_preparer = DataPreparer(file_path, forecast_feature, date_index)

    data_preparer.load_data()
    crafted_sales_data = data_preparer.craft_dataset()
    # data_preparer.plot_data()
    data_preparer.sort_dataset()
    crafted_sales_data = data_preparer.get_crafted_data()

    # train in-sampling model
    train_in_sample(crafted_sales_data,logs_dir+"\in_sampling_logs")

    # train out-sampling model
    train_out_sample(crafted_sales_data,logs_dir+"\out_sampling_logs")

    # extract and visualize train-in-sampling losses
    visualize_losses(logs_dir+"\in_sampling_logs","In Sampling")

    # extract and visualize train-out-sampling losses
    visualize_losses(logs_dir+"\out_sampling_logs", "Out Sampling")

    plt.show()


main(file_path,forecast_feature,date_index)