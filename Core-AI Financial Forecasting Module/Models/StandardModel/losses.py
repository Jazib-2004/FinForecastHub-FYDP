import os
from tensorboard.backend.event_processing.event_accumulator import EventAccumulator
import matplotlib.pyplot as plt
from StandardModel.config import plot_dir

def visualize_losses(logdir, train_type):
    event_acc = EventAccumulator(logdir)
    event_acc.Reload()
    # List all available scalar tags
    print("Available tags:", event_acc.Tags()["scalars"])

    # Extract scalar summaries
    train_losses = event_acc.Scalars("train/loss") 
    val_losses = event_acc.Scalars("eval/loss")
    
    # Parse step and value
    train_steps = [x.step for x in train_losses]
    train_values = [x.value for x in train_losses]
    
    val_steps = [x.step for x in val_losses]
    val_values = [x.value for x in val_losses]
    
    # Plot losses
    plt.figure(figsize=(10, 6))
    plt.plot(train_steps, train_values, label="Training Loss", color="blue")
    plt.plot(val_steps, val_values, label="Validation Loss", color="orange")
    plt.xlabel("Steps")
    plt.ylabel("Loss")
    plt.title(train_type+" Training and Validation Losses")
    plt.legend()
    plt.grid()

    # save figure to .png file

    plot_filename = os.path.join(plot_dir, train_type+" losses.png")
    plt.savefig(plot_filename, dpi=300)
    plt.close()
    print("Plot saved successfuly")
