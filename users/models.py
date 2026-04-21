from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"


""""This creates a users table with:

id — auto-incrementing primary key
name — user's name
email — unique email
password — hashed password (we'll handle hashing later)
created_at — timestamp auto-set on creation"""
