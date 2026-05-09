from app.database import SessionLocal
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

db = SessionLocal()
try:
    count = db.execute(text('SELECT COUNT(*) FROM listing_master')).scalar()
    print('COUNT', count)
except SQLAlchemyError as e:
    print('ERROR', repr(e))
finally:
    db.close()
