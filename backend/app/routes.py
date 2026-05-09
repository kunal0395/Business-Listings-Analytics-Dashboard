from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from . import models, schemas
from .database import SessionLocal, engine

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def apply_filters(query, search, city, category, source, start_date, end_date):
    if search:
        term = f"%{search}%"
        query = query.filter(
            or_(
                models.Listing.business_name.ilike(term),
                models.Listing.category.ilike(term),
                models.Listing.city.ilike(term)
            )
        )
    if city:
        query = query.filter(models.Listing.city == city)
    if category:
        query = query.filter(models.Listing.category == category)
    if source:
        query = query.filter(models.Listing.source == source)

    if start_date:
        try:
            start_dt = datetime.fromisoformat(start_date)
            query = query.filter(models.Listing.created_at >= start_dt)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid start_date format")
    if end_date:
        try:
            end_dt = datetime.fromisoformat(end_date)
            query = query.filter(models.Listing.created_at <= end_dt)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid end_date format")

    return query


@router.post("/insert-listings", summary="Bulk insert listings")
def insert_listings(listings: list[schemas.ListingCreate], db: Session = Depends(get_db)):
    objs = [models.Listing(**l.dict()) for l in listings]
    db.bulk_save_objects(objs)
    db.commit()
    return {"inserted": len(objs)}

@router.get("/city-stats", response_model=list[dict], summary="City-wise counts")
def city_stats(
    search: Optional[str] = Query(None, description="Search text for name, category, or city"),
    city: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Listing.city, func.count(models.Listing.id).label("count"))
    query = apply_filters(query, search, city, category, source, start_date, end_date)
    results = query.group_by(models.Listing.city).order_by(func.count(models.Listing.id).desc()).limit(8).all()
    return [{"city": city, "count": count} for city, count in results]

@router.get("/category-stats", response_model=list[dict], summary="Category-wise counts")
def category_stats(
    search: Optional[str] = Query(None, description="Search text for name, category, or city"),
    city: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Listing.category, func.count(models.Listing.id).label("count"))
    query = apply_filters(query, search, city, category, source, start_date, end_date)
    results = query.group_by(models.Listing.category).order_by(func.count(models.Listing.id).desc()).all()

    if len(results) > 8:
        top_results = results[:8]
        other_count = sum(count for _, count in results[8:])
        results = top_results + [("Others", other_count)]

    return [{"category": category, "count": count} for category, count in results]

@router.get("/source-stats", response_model=list[dict], summary="Source-wise percentage distribution")
def source_stats(
    search: Optional[str] = Query(None, description="Search text for name, category, or city"),
    city: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Listing.source, func.count(models.Listing.id).label("count"))
    query = apply_filters(query, search, city, category, source, start_date, end_date)
    results = query.group_by(models.Listing.source).order_by(func.count(models.Listing.id).desc()).all()

    total = sum(count for _, count in results) or 1
    top_results = results[:8]
    if len(results) > 8:
        other_count = sum(count for _, count in results[8:])
        top_results = top_results + [("Others", other_count)]

    return [
        {
            "source": source,
            "count": count,
            "percentage": round(count * 100.0 / total, 1)
        }
        for source, count in top_results
    ]

@router.get("/filter-options", summary="Filter dropdown options")
def filter_options(db: Session = Depends(get_db)):
    cities = [row[0] for row in db.query(models.Listing.city).distinct().order_by(models.Listing.city).all() if row[0]]
    categories = [row[0] for row in db.query(models.Listing.category).distinct().order_by(models.Listing.category).all() if row[0]]
    sources = [row[0] for row in db.query(models.Listing.source).distinct().order_by(models.Listing.source).all() if row[0]]
    return {
        "cities": cities,
        "categories": categories,
        "sources": sources
    }

@router.get("/listings/count", summary="Count listings for current filters")
def listings_count(
    search: Optional[str] = Query(None, description="Search text for name, category, or city"),
    city: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(func.count(models.Listing.id))
    query = apply_filters(query, search, city, category, source, start_date, end_date)
    total = query.scalar() or 0
    return {"total": total}

@router.get("/listings", response_model=List[schemas.ListingOut], summary="List business listings")
def list_listings(
    search: Optional[str] = Query(None, description="Search text for name, category, or city"),
    city: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = db.query(models.Listing)
    query = apply_filters(query, search, city, category, source, start_date, end_date)

    query = query.offset(offset).limit(limit)
    return query.all()
