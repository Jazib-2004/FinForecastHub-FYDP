# imports
import os
import shutil
import matplotlib.pyplot as plt
from sktime.forecasting.ttm import TinyTimeMixerForecaster
from sktime.utils.plotting import plot_series
from LargeModel.config import plot_dir

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


def train_model(data, logs_dir):

    
    # Clean logs directory before starting a new training run
    if os.path.exists(logs_dir):
        shutil.rmtree(logs_dir) 
    os.makedirs(logs_dir)

    # Initialize forecaster with required configurations
    forecaster = TinyTimeMixerForecaster(
    config={
        "context_length": 64,
        "prediction_length": 24,
    },
    training_args={
        # "num_train_epochs": 300,
        "output_dir": "test_output",
        "per_device_train_batch_size": 64,
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
    forecaster.fit(data, fh=list(range(1, 1 + horizon_len)))
    y_pred = forecaster.predict()
    # Plotting out-of-sample predictions
    plot_series(data,y_pred)

    # save fig to .png file
    plot_filename = os.path.join(plot_dir, "out_sampling_forecasts.png")
    plt.savefig(plot_filename, dpi=300)
    plt.close()
    print("Plot saved successfuly")
