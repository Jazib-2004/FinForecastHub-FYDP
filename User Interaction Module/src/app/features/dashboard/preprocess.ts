export default function Preprocess(
  parsedData: any,
  selectedColumns: string[]
): void {// Assuming `columnNames` is an array of column names
    const formattedDataset = parsedData.data.map((row: string[]) => {
        let rowObject: { [key: string]: any } = {};  // Define rowObject as an object with string keys and any values
      
        // Assuming columnNames is already defined properly
        
      
        row.forEach((value: any, index: number) => {  // Define value and index types explicitly
          rowObject[selectedColumns[index]] = value;  // Indexing into rowObject using columnNames
        });
      
        return rowObject;
      });
      
    
    // Now, sending the data as an array of objects:
    console.log("Sending formatted JSON data:", {
      dataset: formattedDataset,  // Array of objects instead of arrays
      selected_feature: selectedColumns[0],
    });
    
    fetch("http://localhost:8000/preprocess/preprocess_dataset/", {
      method: "POST",
      body: JSON.stringify({
        dataset: formattedDataset,  // Send as an array of objects
        selected_feature: selectedColumns[0], 
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to upload dataset.");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
    }
    
