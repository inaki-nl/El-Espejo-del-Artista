import os
from dotenv import load_dotenv
from pathlib import Path

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

ruta_dotenv = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(ruta_dotenv, override=True)

DATABASE_URL = os.environ.get("DB_CONEXION", "")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


if __name__ == "__main__":
    try:
        with engine.connect() as connection:
            resultado = connection.execute(text("SELECT VERSION()"))

        print("Conexión Exitosa")
    except Exception as err:
        print(f"Error de conexión {err}")
