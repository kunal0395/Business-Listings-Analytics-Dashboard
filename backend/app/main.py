from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import router
from .database import engine
from .models import Base

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Business Listings Analytics Dashboard"
)

# CORS configuration 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

# Home route
@app.get("/")
def home():
    return {
        "message": "Business Listings Analytics API Running Successfully"
    }