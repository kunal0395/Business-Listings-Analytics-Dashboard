import pandas as pd
import os
import random

# Dataset folder
DATASET_FOLDER = "dataset"

# Output folder
RESULT_FOLDER = "dataset_result"

# Create result folder if not exists
os.makedirs(RESULT_FOLDER, exist_ok=True)

all_dataframes = []

# Loop through all CSV files
for file in os.listdir(DATASET_FOLDER):

    if file.endswith(".csv"):

        file_path = os.path.join(DATASET_FOLDER, file)

        print(f"\nProcessing: {file}")

        try:

            df = pd.read_csv(file_path)

            print("Original Shape:", df.shape)

            # Convert all column names to lowercase
            df.columns = [col.lower().strip() for col in df.columns]

            # Common possible column mappings
            column_mapping = {}

            for col in df.columns:

                if col in ["name", "restaurant_name", "hotel_name", "hospital_name", "business_name"]:
                    column_mapping[col] = "business_name"

                elif col in ["city", "location"]:
                    column_mapping[col] = "city"

                elif col in ["address", "addr"]:
                    column_mapping[col] = "address"

                elif col in ["category", "type", "cuisine", "speciality"]:
                    column_mapping[col] = "category"

            # Rename columns
            df.rename(columns=column_mapping, inplace=True)

            # Ensure required columns exist
            required_columns = [
                "business_name",
                "category",
                "city",
                "address"
            ]

            for col in required_columns:
                if col not in df.columns:
                    df[col] = "Unknown"

            # Keep only required columns
            df = df[[
                "business_name",
                "category",
                "city",
                "address"
            ]]

            # Drop null values
            df.dropna(inplace=True)

            # Remove duplicates
            df.drop_duplicates(inplace=True)

            # Clean text
            for col in df.columns:
                df[col] = df[col].astype(str).str.strip()

            # Keep only first category if comma separated
            df["category"] = df["category"].apply(
                lambda x: x.split(",")[0]
            )

            # Generate phone numbers
            df["phone"] = [
                str(random.randint(6000000000, 9999999999))
                for _ in range(len(df))
            ]

            # Add source column from filename
            source_name = file.replace(".csv", "")
            df["source"] = source_name

            # Balance oversized data sources during preprocessing
            if source_name.lower().startswith("swiggy") and len(df) > 5000:
                df = df.sample(5000, random_state=42).reset_index(drop=True)

            print("Cleaned Shape:", df.shape)

            all_dataframes.append(df)

        except Exception as e:

            print(f"Error processing {file}")
            print(e)

# Merge all datasets
final_df = pd.concat(all_dataframes, ignore_index=True)

# Final duplicate removal
final_df.drop_duplicates(inplace=True)

# Save final CSV
output_path = os.path.join(
    RESULT_FOLDER,
    "business_listings_kaggle.csv"
)

final_df.to_csv(output_path, index=False)

print("\nFINAL CSV GENERATED SUCCESSFULLY")
print(f"Total Records: {len(final_df)}")
print(f"Saved At: {output_path}")