from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ListingBase(BaseModel):
    business_name: Optional[str] = None
    category: str
    city: str
    address: Optional[str] = None
    phone: Optional[str] = None
    source: Optional[str] = None

class ListingCreate(ListingBase):
    pass

class ListingOut(ListingBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = {
        "from_attributes": True
    }

class Stat(BaseModel):
    name: str
    count: int
