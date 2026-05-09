# Business Listings Analytics Dashboard
[Live Demo](https://business-listings-analytics-dashboard-at44.onrender.com/)
# 📖 Project Overview

Business Listings Analytics Dashboard is a full-stack data analytics application that collects, processes, stores, and visualizes business listing data from multiple datasets and sources.

The project demonstrates:
- Data preprocessing and cleaning
- ETL workflow
- MySQL database integration
- FastAPI backend APIs
- React analytics dashboard
- Interactive charts and filters

The dashboard helps visualize:
- City-wise business distribution
- Category-wise analytics
- Source-wise insights
- Searchable and filterable listings

---

# 🚀 Features

## ✅ Data Analytics Features
- Category-wise business analysis
- City-wise business distribution
- Source-wise listing analytics
- KPI summary cards
- Search and filtering system

## ✅ Data Engineering Features
- Multi-dataset integration
- Data preprocessing pipeline
- Duplicate removal
- Missing value handling
- Dataset balancing and sampling
- CSV generation and transformation

## ✅ Backend Features
- FastAPI REST APIs
- MySQL integration
- Aggregation endpoints
- Pagination support
- Dynamic filtering APIs

## ✅ Frontend Features
- Interactive analytics dashboard
- Responsive UI
- Donut charts and bar charts
- Search functionality
- Dynamic filters
- Listings table

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Recharts
- Axios

## Backend
- Python
- FastAPI
- SQLAlchemy
- Pandas

## Database
- MySQL
- Aiven Cloud MySQL

## Data Processing
- Pandas
- CSV preprocessing
- Data cleaning

---

# 📂 Folder Structure

```bash
Business-Listings-Analytics-Dashboard/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   ├── dataset/
│   ├── dataset_result
│   ├── models/
│   ├── Scripts
│   ├── requirements.txt
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-github-repository-link>
cd Business-Listings-Analytics-Dashboard
```

---

# 2️⃣ Backend Setup

## Navigate to Backend Folder

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 3️⃣ Configure Environment Variables

Create `.env` file inside backend folder:

```env
DB_HOST=your_host
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

---

# 4️⃣ Run FastAPI Backend

```bash
uvicorn main:app --reload
```

Backend will run at:

```bash
http://localhost:8000
```

Swagger Docs:

```bash
http://localhost:8000/docs
```

---

# 5️⃣ Frontend Setup

## Navigate to Frontend Folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend will run at:

```bash
http://localhost:5173
```

---

# 🗄️ Database Setup

## Create MySQL Database

```sql
CREATE DATABASE business_dashboard;
```

---

# Import SQL Dump

```bash
mysql -u root -p business_dashboard < database_dump.sql
```

---

# 📊 Database Schema

## Table: `listing_master`

| Column Name | Description |
|---|---|
| id | Primary Key |
| business_name | Name of business |
| category | Business category |
| city | Business city |
| address | Business address |
| phone | Contact number |
| source | Dataset source |
| created_at | Timestamp |

---

# 🔄 Data Preprocessing Pipeline

The project uses multiple business datasets from different sources.

## Data Processing Steps
- Load datasets
- Merge datasets
- Standardize columns
- Remove duplicates
- Handle missing values
- Balance datasets
- Generate final CSV

---

# 📁 Database Dump Link

```bash
https://drive.google.com/file/d/1L2-LsWdrRPwSuehgS20E8KdACJspvvCj/view?usp=sharing
```

---

# 📈 Dashboard Features

## KPI Cards
- Total Listings
- Total Cities
- Total Categories
- Total Sources

## Charts
- Category Distribution
- City-wise Listings
- Source Distribution

## Filters
- Search by business name
- Filter by city
- Filter by category
- Filter by source

## Listings Table
- Paginated table
- Searchable records
- Dynamic filtering

---

# 🔌 API Endpoints

## Fetch All Listings

```http
GET /listings
```

---

## Category Analytics

```http
GET /category-stats
```

---

## City Analytics

```http
GET /city-stats
```

---

## Source Analytics

```http
GET /source-stats
```

---

# 📸 Screenshots

## Dashboard Overview

<img width="1351" height="611" alt="1" src="https://github.com/user-attachments/assets/e47ec3f5-1e0b-491f-8087-31a08cd02754" />

---

## Analytics Charts

<img width="1350" height="609" alt="2" src="https://github.com/user-attachments/assets/fb63a17b-ba26-433e-a5a9-318213e1eac2" />

---
<img width="1349" height="606" alt="3" src="https://github.com/user-attachments/assets/9e0220b7-d6f1-4dd3-bc4f-d9685cbe5213" />

---

# 🧠 Challenges Faced

## 1️⃣ Large Dataset Handling
Some datasets contained over 100,000 rows which caused chart overcrowding and slower database insertion.

### Solution
Applied dataset balancing and random sampling to optimize dashboard performance.

---

## 2️⃣ Inconsistent Dataset Structure
Different datasets had different column names and formats.

### Solution
Implemented schema standardization and column mapping using Pandas.

---

## 3️⃣ Chart Visualization Issues
Large numbers of categories and cities made charts unreadable.

### Solution
Displayed only top categories and top cities while grouping remaining data into "Others".

---

## 4️⃣ Database Insertion Performance
Bulk insertion caused connection timeouts on cloud database free tier.

### Solution
Used chunk-based insertion using Pandas and SQLAlchemy.

---

## 5️⃣ Frontend Responsiveness
Analytics dashboard initially appeared cluttered on smaller screens.

### Solution
Improved responsive layouts and optimized chart sizing.

---

# ☁️ Deployment

## Frontend Deployment
Frontend can be deployed using:
- Vercel
- Netlify

## Backend Deployment
Backend can be deployed using:
- Render
- Railway

## Database
- Aiven Cloud MySQL

---

# 📦 Requirements

## Backend Requirements

```txt
fastapi
uvicorn
sqlalchemy
pymysql
python-dotenv
pandas
```

---

## Frontend Requirements

```bash
npm install
```

---

# 🧪 Testing

## Backend API Testing
Used:
- Swagger UI
- Postman

## Frontend Testing
Tested:
- Filters
- Charts
- API integration
- Pagination

---
## Deployment

You can deploy:

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway / VPS
* **Database:** Avien
---

## License

This project is for personal and educational use unless otherwise stated.
