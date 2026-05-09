from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Listing(Base):
    __tablename__ = "listing_master"
    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(255))
    category = Column(String(255), index=True)
    city = Column(String(255), index=True)
    address = Column(Text)
    phone = Column(String(50))
    source = Column(String(100), index=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
