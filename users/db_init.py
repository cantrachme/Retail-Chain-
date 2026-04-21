from core.database import Base, engine
from users.models import User  # import all models so Base knows about them


def init_db():
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")
