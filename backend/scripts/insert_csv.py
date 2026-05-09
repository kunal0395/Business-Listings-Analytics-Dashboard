import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

engine = create_engine(
    DATABASE_URL,
    pool_recycle=3600
)

# Read CSV
df = pd.read_csv(
    # "dataset_result/mock_data.csv"
    # "dataset_result/business_listings_kaggle.csv"
    "dataset_result/business_listings.csv"
)

print("Total Rows:", len(df))

# Insert in chunks
chunk_size = 5000

for i in range(0, len(df), chunk_size):

    chunk = df[i:i + chunk_size]

    try:

        chunk.to_sql(
            "listing_master",
            con=engine,
            if_exists="append",
            index=False,
            method="multi"
        )

        print(f"Inserted Rows: {i} to {i + len(chunk)}")

    except Exception as e:

        print(f"Error at chunk starting {i}")
        print(e)

print("DATA INSERT COMPLETED")