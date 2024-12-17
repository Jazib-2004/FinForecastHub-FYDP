# imports
import os
import shutil
import matplotlib.pyplot as plt
from sktime.forecasting.ttm import TinyTimeMixerForecaster
from sktime.utils.plotting import plot_series
from StandardModel.config import plot_dir

def train_model(data, logs_dir):
    
    # Clean logs directory before starting a new training run
    if os.path.exists(logs_dir):
        shutil.rmtree(logs_dir) 
    os.makedirs(logs_dir)

    # Initialize forecaster with required configurations
    forecaster = TinyTimeMixerForecaster(
        config={
            "context_length": 32,
            "prediction_length": 12,
        },
        training_args={
            # "num_train_epochs": 300,
            "output_dir": "test_output",
            "per_device_train_batch_size": 4,
            "report_to": "tensorboard",
            "learning_rate": 1e-4,
            "max_steps": 400,
            "logging_dir": logs_dir,  # Logs directory
            "eval_steps": 10,
            "evaluation_strategy": "steps",
            "logging_steps": 50,
        },
        validation_split=0.5,
    )

    horizon_len = forecaster.config['prediction_length']

    # Fit the model on the entire dataset
    forecaster.fit(data[:-horizon_len], fh=list(range(1, 1 + horizon_len)))
    y_pred = forecaster.predict()
    
    # plotting forecasts
    plot_series(data, y_pred)

    # save plot to .png file
    plot_filename = os.path.join(plot_dir, "in_sampling_forecasts.png")
    plt.savefig(plot_filename, dpi=300)
    plt.close()
    print("Plot saved successfuly")

