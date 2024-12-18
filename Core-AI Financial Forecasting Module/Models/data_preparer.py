import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

class DataPreparer:
    def __init__(self, file_path, forecast_feature, date_index):
        """
        Initialize with file path, forecast feature, and date index column name.
        """
        self.file_path = file_path
        self.forecast_feature = forecast_feature
        self.date_index = date_index
        self.dataset = None
        self.crafted_data = None

    def load_data(self):
        """
        Load dataset from the file path provided.
        """
        self.dataset = pd.read_csv(self.file_path)
        print("Data loaded successfully!")
        print(self.dataset.head())
    
    def craft_dataset(self):
        """
        Process and scale the dataset: 
        - Convert the date column to datetime
        - Set the date column as index
        - Scale the forecast feature
        """
        # Convert the date column to datetime
        try:
        # Attempt to parse the column to datetime
            self.dataset[self.date_index] = pd.to_datetime(self.dataset[self.date_index], format="%y-%b")
            print(f"Successfully converted column '{self.date_index}' to datetime.")
        except Exception as e:
            print(f"Error while converting column '{self.date_index}': {e}")

        # Set date column as index
        self.dataset.set_index(self.date_index, inplace=True)

        # Scale the forecast feature
        scaler = MinMaxScaler()
        dataset_scaled = scaler.fit_transform(self.dataset[[self.forecast_feature]])
        self.crafted_data = pd.DataFrame(dataset_scaled, columns=[self.forecast_feature], index=self.dataset.index)

        print("Data crafted successfully!")
        return {"scaler":scaler, "data":self.crafted_data}

    def plot_data(self):
        """
        Plot the crafted data to visualize the time-series trends.
        """
        if self.crafted_data is not None:
            self.crafted_data.plot(title="Time Series Plot of Forecast Feature")
            plt.xlabel("Date")
            plt.ylabel(self.forecast_feature)
            plt.save()
        else:
            print("No crafted data to plot. Please call 'craft_dataset()' first.")

    def sort_dataset(self):
        """
        Sort the dataset by its index (date) for consistency.
        """
        if self.crafted_data is not None:
            self.crafted_data = self.crafted_data.sort_index()
            print("Data sorted successfully!")
        else:
            print("No crafted data to sort. Please call 'craft_dataset()' first.")

    def get_crafted_data(self):
        """
        Return the crafted dataset for use in other parts of the program.
        """
        return self.crafted_data
